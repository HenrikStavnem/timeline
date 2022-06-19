import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IActorName, IActorNameCard, IEra, IMonth } from 'src/app/interfaces/timeline';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'character-edit-names',
	templateUrl: './character-edit-names.component.html',
	styleUrls: ['./character-edit-names.component.scss']
})
export class CharacterEditNamesComponent implements OnInit {
	@Input() parentNames: IActorNameCard[];

	@Input() parentCloseAside: () => void;

	@Input() setNames: (names) => void;

	timelineId: number = 9;

	form: UntypedFormGroup;
	
	isAsideOpen: boolean = false;
	names: IActorNameCard[] = [];

	eras: IEra;
	months: IMonth;

	exactnessTypes: string[] = [
		'millenia',
		'century',
		'decade',
		'season',
		'beforeYear',
		'year',
		'afterYear',
		'beforeMonth',
		'month',
		'afterMonth',
		'relative',
		'beforeDay',
		'day',
		'afterDay',
		'unknown'
	];

	constructor(private timelineService: TimelineService) {
		this.timelineService.getMonths(this.timelineId).subscribe((result:any) => {
			this.eras = result.eras;
			this.months = result.months;
		});
	}

	ngOnInit(): void {
		this.names = this.parentNames;

		this.form = new UntypedFormGroup({
			FirstName: new UntypedFormControl('', [
			]),
			LastName: new UntypedFormControl('', [
			]),
		});
	}

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(): void {
		this.isAsideOpen = true;
	}

	closeAside(): void {
		this.isAsideOpen  = false;
	}

	insertNames(): void {
		this.setNames(this.names);
		this.parentCloseAside();
	}

	onNameSaveClick(name: IActorNameCard): void {
		name.isBeingEdited = false;

		name.actorName.firstName = this.form.get('FirstName').value;
		name.actorName.lastName = this.form.get('LastName').value;
	}

	onNameEditClick(name: IActorNameCard): void {
		name.isBeingEdited = true;
	}

	onNameDeleteClick(name: IActorNameCard): void {
		function remove(array, value) {
			return array.filter(function(el) {
				return el != value;
			});
		}
		this.names = remove(this.names, name);
	}

	onExactnessChange(name: IActorNameCard, event: InputEvent): void {
		name.actorName.startDate.exactness = event.data;
	}

	addNewNameField(): void {
		this.names.push({
			actorName: {
				firstName: "Testerius", lastName: "Exampleriyn",
				startDate: {day: 1, era: 1, exactness: 'year', month: 1, year: 2000},
				endDate: {day: 1, era: 1, exactness: 'month', month: 1, year: 2281}
			},
			isBeingEdited: true, //true
			isNew: true
		});
	}
}

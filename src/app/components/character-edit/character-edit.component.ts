import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'character-edit',
	templateUrl: './character-edit.component.html',
	styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
	isAsideOpen: boolean = false;
	openAsideId: string = "";
	names: IActorNameCard[] = [];
	genders: IActorGenderCard[] = [];

	ngOnInit(): void {
		this.names.push({
			actorName: {
				firstName: "FirstName", lastName: "LastName",
				startDate: {day: 1, era: 1, exactness: 'day', month: 1, year: 1985},
				endDate: {day: 1, era: 1, exactness: 'day', month: 1, year: 2000}
			},
			isBeingEdited: false,  //true
			isNew: true
		});

		this.genders.push({
			gender: {
				title: 'Male',
				startDate: {
					era: 1,
					year: 1975,
					month: 1,
					day: 1,
					exactness: 'day'
				},
				endDate: {
					era: 1,
					year: 2013,
					month: 1,
					day: 1,
					exactness: 'day'
				}
			},
			isBeingEdited: false,
			isNew: false
		});
	}

	constructor(public toastService: ToastService) {
	}

	onSaveCharacterClick() {
		this.toastService.updateToast('Save character is not yet implemented');
	}

	setNames = (names: IActorNameCard[]) => {
		this.names = names;
	}

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(id: string): void {
		this.openAsideId = id;
		this.isAsideOpen = true;
	}

	closeAside = (): void => {
		this.isAsideOpen  = false;
	}
}

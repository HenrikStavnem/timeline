import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IActor, IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'character-edit',
	templateUrl: './character-edit.component.html',
	styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
	form: FormGroup;

	isAsideOpen: boolean = false;
	openAsideId: string = "";
	
	names: IActorNameCard[] = [];
	genders: IActorGenderCard[] = [];
	description: string = "";
	slug: string = "";
	portraitImage: string = "https://tokens.dukendor.com/graphics/avatars/visitor.png";
	coverImage: string;

	ngOnInit(): void {
		this.form = new FormGroup({
			Description: new FormControl('', [
			]),
			Slug: new FormControl('', [
			]),
		});

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
		this.description = this.form.get('Description').value;
		this.slug = this.form.get('Slug').value;

		let character: IActor = {
			birth: null,
			birthDate: null,
			coverImage: this.coverImage,
			deathDate: null,
			description: this.description,
			firstName: this.names[0].actorName.firstName,
			lastName: this.names[0].actorName.lastName,
			id: null,
			image: this.portraitImage,
			names: [],
			shield: null,
			slug: this.slug,
			titles: [],
			type: 'hardcoded',
			dndStats: null,
			settings: null
		}

		console.log('character', character);

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

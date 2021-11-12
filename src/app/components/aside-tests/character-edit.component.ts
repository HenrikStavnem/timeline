/*
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';

@Component({
	selector: 'character-edit',
	templateUrl: './character-edit.component.html',
	styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
	isAsideOpen: boolean = false;
	names: IActorNameCard[] = [];
	genders: IActorGenderCard[] = [];

	ngOnInit(): void {
	}

	constructor() {
	}

	addNewNameField(): void {
		this.names.push({
			actorName: {
				firstName: "FirstName", lastName: "LastName",
				startDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 1985},
				endDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 2000}
			},
			isBeingEdited: true,
			isNew: true
		});
	}

	onNameSaveClick(name: IActorNameCard): void {
		name.isBeingEdited = false;
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

	addNewGenderCard(): void {
		this.genders.push({
			gender: {
				title: "Female",
				startDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 1985},
				endDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 2000}
			},
			isBeingEdited: true,
			isNew: true
		});
	}

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(): void {
		this.isAsideOpen = true;
	}

	closeAside(): void {
		this.isAsideOpen  = false;
	}
}
*/
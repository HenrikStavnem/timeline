import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IActorName, IActorNameCard } from 'src/app/interfaces/timeline';

@Component({
	selector: 'character-edit-names',
	templateUrl: './character-edit-names.component.html',
	styleUrls: ['./character-edit-names.component.scss']
})
export class CharacterEditNamesComponent implements OnInit {
	@Input() parentNames: IActorNameCard[];

	@Input() parentCloseAside: () => void;

	@Input() setNames: (names) => void;
	
	isAsideOpen: boolean = false;
	names: IActorNameCard[] = [];

	ngOnInit(): void {
		this.names = this.parentNames;

		this.names.push({
			actorName: {
				firstName: "FirstName", lastName: "LastName",
				startDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 1985},
				endDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 2000}
			},
			isBeingEdited: false,  //true
			isNew: true
		});
	}

	constructor() {
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

	addNewNameField(): void {
		this.names.push({
			actorName: {
				firstName: "FirstName", lastName: "LastName",
				startDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 1985},
				endDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 2000}
			},
			isBeingEdited: false, //true
			isNew: true
		});
	}
}

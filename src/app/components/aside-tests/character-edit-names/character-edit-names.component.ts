import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';

@Component({
	selector: 'character-edit-names',
	templateUrl: './character-edit-names.component.html',
	styleUrls: ['./character-edit-names.component.scss']
})
export class CharacterEditNamesComponent implements OnInit {
	isAsideOpen: boolean = false;
	//names: IActorNameCard[] = [];
	//genders: IActorGenderCard[] = [];

	ngOnInit(): void {
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
}

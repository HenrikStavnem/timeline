import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';

@Component({
	selector: 'character-edit-genders',
	templateUrl: './character-edit-genders.component.html',
	styleUrls: ['./character-edit-genders.component.scss']
})
export class CharacterEditGendersComponent implements OnInit {
	isAsideOpen: boolean = false;
	//names: IActorNameCard[] = [];
	//genders: IActorGenderCard[] = [];

	ngOnInit(): void {
	}

	constructor() {
	}

	@Input() parentCloseAside: () => void;

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(): void {
		this.isAsideOpen = true;
	}

	closeAside(): void {
		this.isAsideOpen  = false;
	}

	test(): void {
		this.parentCloseAside();
	}
}

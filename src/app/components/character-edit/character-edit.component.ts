import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IActorName } from 'src/app/interfaces/timeline';

@Component({
	selector: 'character-edit',
	templateUrl: './character-edit.component.html',
	styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
	names: IActorName[] = [];

	ngOnInit(): void {
	}

	constructor() {
	}

	addNewNameField(): void {
		
		this.names.push({
			firstName: "FirstName", lastName: "LastName",
			startDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 1985},
			endDate: {day: 1, era: 1, exactness: 'exact', month: 1, year: 2000}
		});
	}
}

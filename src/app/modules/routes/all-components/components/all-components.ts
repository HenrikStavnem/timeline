import { Component, OnInit } from '@angular/core';
import { AbilityScore } from 'src/app/interfaces/timeline';

@Component({
	selector: 'all-components',
	templateUrl: './all-components.component.html',
	styleUrls: ['./all-components.component.scss'],
})
export class AllComponentsComponent implements OnInit {
	abilitieScores: AbilityScore[];
	playerDescription: string = `{"ops":[{"attributes":{"bold":true},"insert":"Treasure.","type":"text"},{"insert":"\nThe owner of whatever card destroys this card draws a Treasure card\n","type":"text"},{"insert":"Bold","type":"text","attributes":{"bold":true}},{"insert":"Italic","type":"text","attributes":{"italic":true}},{"insert":"Bold AND Italic","type":"text","attributes":{"bold":true,"italic":true}}]}`;

	constructor(
	) { }

	ngOnInit(): void {
		this.abilitieScores = [
			{title: 'Strength', score: 15},
			{title: 'Dexterity', score: 15},
			{title: 'Constitution', score: 12},
			{title: 'Wisdom', score: 14},
			{title: 'Intelligence', score: 20},
			{title: 'Charisma', score: 30}
		];
	}
}

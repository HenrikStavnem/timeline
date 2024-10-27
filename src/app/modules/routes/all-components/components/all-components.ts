import { Component, OnInit } from '@angular/core';
import { AbilityScore } from 'src/app/interfaces/timeline';

@Component({
	selector: 'all-components',
	templateUrl: './all-components.component.html',
	styleUrls: ['./all-components.component.scss'],
})
export class AllComponentsComponent implements OnInit {
	abilitieScores: AbilityScore[];

	constructor(
	) { }

	ngOnInit(): void {
		this.abilitieScores = [
			{title: 'Strength', score: 15},
			{title: 'Dexterity', score: 15},
			{title: 'Constitution', score: 12},
			{title: 'Wisdom', score: 14},
			{title: 'Intelligence', score: 20},
			{title: 'Charisma', score: 5}
		];
	}
}

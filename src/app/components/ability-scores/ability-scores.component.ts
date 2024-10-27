import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbilityScore } from 'src/app/interfaces/timeline';

@Component({
  selector: 'ability-scores',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ability-scores.component.html',
  styleUrl: './ability-scores.component.scss'
})
export class AbilityScoresComponent implements OnInit {
	@Input() abilitieScores: AbilityScore[];

	ngOnInit(): void {
		// this.abilitieScores = [
		// 	{title: 'Strength', score: 15},
		// 	{title: 'Dexterity', score: 15},
		// 	{title: 'Constitution', score: 12},
		// 	{title: 'Wisdom', score: 14},
		// 	{title: 'Intelligence', score: 20},
		// 	{title: 'Charisma', score: 5}
		// ]
	}

	getModifier(value: number): string {
		const modifierValue =  Math.floor((value - 10) / 2);

		return ((modifierValue > -1) ? "+" : "") + modifierValue;
	}
}

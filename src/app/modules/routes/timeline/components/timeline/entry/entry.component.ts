import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { Entry } from '../../classes/entry/entry';
//import { Person } from '../../classes/person';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { IActor, IActors, IDate, IEntry } from 'src/app/interfaces/timeline';

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	@Input() item: IEntry;
	@Input() references: IActors;//Array<Reference>;
	@Input() date: IDate;

	ngOnInit(): void {
		//console.log('entry date', this.date);
		console.log("entry", this.item);
	}

	constructor() {
	}

	// TODO: Below should be moved to timeline.mapper.ts
	private getRefenceAge(birthDate: IDate): string {
		if (this.date.era !== birthDate.era) { // TODO: Check for exactness
			console.log("era is not compatible", this.date.era, birthDate.era);
			return undefined;
		}

		if (this.date.year === birthDate.year) {
			if (this.date.month === birthDate.month) {
				if (this.date.day === birthDate.day) {
					// born today!
					return 'Born today!';
				}
				if (this.date.day > birthDate.day) {
					// born after today
					return this.date.day - birthDate.day + ' days old';
				}
				// born same year, month, but after current day = not born yet
				return 'Born this year, but later';
			}
		}

		if (this.date.year > birthDate.year) {
			return this.date.year - birthDate.year + ' years old';
		}

		return 'Not born yet';
	}
}

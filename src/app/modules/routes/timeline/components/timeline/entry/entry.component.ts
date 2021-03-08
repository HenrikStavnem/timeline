import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { Entry } from '../../classes/entry/entry';
//import { Person } from '../../classes/person';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { IActor, IActors, IDate } from 'src/app/interfaces/timeline';

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	@Input() item: any;
	@Input() references: IActors;//Array<Reference>;
	@Input() date: IDate;

	ngOnInit(): void {
		//console.log('entry date', this.date);
	}

	constructor() {
	}
}

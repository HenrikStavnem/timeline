import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Entry } from '../../classes/entry/entry';
import { Person } from '../../classes/person';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	@Input() item: Entry;
	@Input() references: Array<Reference>;
	@Input() year: number;

	ngOnInit(): void {
	}

	constructor() {
	}
}

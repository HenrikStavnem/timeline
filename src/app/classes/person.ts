//import { Entry } from './entry/entry';
import { Reference } from '../reference';

export class Person extends Reference {
	public type: string = "person";

	constructor(index: number, firstName: string, lastName: string, title: string, birthYear: number, deathYear: number) {
		super(index, "person", firstName, lastName, title, birthYear, deathYear);
	}
}

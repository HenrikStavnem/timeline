//import { Entry } from './entry/entry';
import { Reference } from '../reference';

export class Person extends Reference {
	public type: string = "person";

	constructor(index: number, firstName: string, lastName: string, titles: Array<any>, birthYear: number, deathYear: number) {
		super(index, "person", firstName, lastName, titles, birthYear, deathYear);
	}
}

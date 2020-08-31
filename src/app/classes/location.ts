import { Reference } from '../reference';

export class Location extends Reference {
	public type: string = "location";

	constructor(index: number, name: string) {
		super(index, "location", name, "", [], 0, 0);
	}
}
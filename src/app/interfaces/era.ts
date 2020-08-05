//import { Entry } from '../classes/entry/entry';
import { Year } from '../interfaces/year';

export interface Era {
	title: string,
	description: string,
	years: Array<Year>
}

/*
export interface Year {
	title: string,
	description: string,
	year: number,
	exactness: string,
	dates: Array<Date>
}

export interface Date {
	date: string,
	dateType: string,
	entries: Array<Entry>
}
*/
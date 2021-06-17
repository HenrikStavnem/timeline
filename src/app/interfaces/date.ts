import { Entry } from '../classes/entry/entry';

export interface Date {
	date: string,
	exactness: string,
	entries: Array<Entry>,
	test: string
}
import { Date } from '../interfaces/date';

export interface Year {
	title: string,
	description: string,
	year: number,
	exactness: string,
	dates: Array<Date>
}

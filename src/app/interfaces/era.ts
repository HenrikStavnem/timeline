import { Year } from '../interfaces/year';

export interface Era {
	title: string,
	description: string,
	years: Array<Year>,
	image: string,
	timelineId: number
}
export interface ITimeline {
	id: number,
	title: string,
	description: string,
	image: string,
	author: IAuthor,
	statusCode: number,
	eras: IEra[],
	actors: IActor[],
}

export interface IAuthor {
	name: string,
	icon: string
}

export interface IEra {
	id: number | string,
	title: string,
	description: string,
	years: IYear[]
}

export interface IYear {
	title?: string,
	year: number,
	exactness: string,
	months: IMonth[]
}

export interface IMonth {
	title: string,
	month: number,
	exactness: string,
	days: IDay[]
}

export interface IDay {
	exactness: string,
	day: number,
	entries: IEntry[]
}

export interface IEntry {
	description: string,
	type: string
}

export interface IActor {
	id: number,
	type: string,
	firstName: string,	// TODO: will be replaced by 'names'
	lastName: string,	// TODO: will be replaced by 'names'
	birthYear: number,
	birth: IDate,
	names: IActorName[],
	image: string
}

export interface IDate {
	era: number,
	year: number,
	month: number,
	day: number,
	exactness: string	// TODO: Will this be used like this?
}

export interface IActorName {
	firstName: string,
	lastName: string,
	startDate: IDate,
	endDate: IDate
}

export interface IActorTitle {
	title: string,
	ordinalNumber: string,
	startDate: IDate,
	endDate: IDate
}

export interface ActorTitle {

}

// Old implementation
export interface Timeline {
	title: string
}

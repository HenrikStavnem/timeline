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
	era: number,
	title: string,
	description: string,
	image: string,
	years: IYear[]
}

export interface IYear {
	title?: string,
	year: number,
	exactness: string,
	months: IMonth[]
}

export interface IMonth {
	id?: number,
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
	type: string		// TODO: Use IEventType instead, when BE delivers
}

export interface IEventType {
	id: number,
	title: string,
	image: string
}

export interface IActors {
	characters: any[],
	items: any[],
	locations: any[]
}

export interface IActor {
	id: number,
	type: string,
	firstName: string,	// TODO: will be replaced by 'names'
	lastName: string,	// TODO: will be replaced by 'names'
	birthDate: IDate,
	deathDate: IDate,
	birth: IDate,
	names: IActorName[],
	titles: IActorTitle[],
	image: string,
	coverImage: string,
	description: string,
	slug: string,
	shield: string,	// TODO: will be changed to an array
	dndStats?: IActorDndStats
}

export interface IActorSettings {
	overrideName?: string,
	showAge?: boolean,
	showTitle?: boolean
}

export interface IActorDndStats {
	class: string,		// TODO: Might be changed to an array
	level: number,		// TODO: Might be changed to an array
	background: string,
	playerName: string,	// TODO: Might be a user/player interface
	alignment: string,	// TODO: Might be two props
	armorClass: number,
	initiative: number,
	speed: number,
	strength: number,
	dexterity: number,
	constitution: number,
	intelligence: number,
	wisdom: number,
	charisma: number
}

export interface IDate {
	era: number,
	year: number,
	month: number,
	day: number,
	startable?: boolean,
	expirable?: boolean,
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

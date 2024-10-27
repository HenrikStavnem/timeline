export interface ITimeline {
	id: number,
	title: string,
	description: string,
	image: string,
	author: IAuthor,
	statusCode: number,
	eras: IEra[],
	actors: IActor[],
	slug: string
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
	type: string,		// TODO: Use IEventType instead, when BE delivers
	eventTypeImage?: string,
	elements?: IEntryElements[],
	eventOrder: number
}

export interface IEntryElements {
	type: string,
	// text
	description?: string,
	// character
	name?: string,
	image?: string,
	coverImage?: string,
	age?: string,
	showAge?: boolean,
	birthDate?: IDate,
	deathDate?: IDate,
	title?: string,
	url?: string
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
	dndStats?: IActorDndStats,
	isRpg?: boolean;
	playable?: boolean,
	settings?: IActorSettings,
	isBeingEdited?: boolean // TODO: remove when characters module uses CharacterCard interface
}

export interface IActorCompact {
	id: number,
	firstName: string,
	lastName: string
}

export interface IActorSettings {
	overrideName?: string,
	showAge?: boolean,
	showTitle?: boolean
}

export interface IActorAge {
	isUnknown: boolean,
	isBorn: boolean,
	isDead: boolean,
	daysOld: number,
	monthsOld: number,
	yearsOld: number
}

export interface IActorDndStats {
	class: string,		// TODO: Might be changed to an array
	level: number,		// TODO: Might be changed to an array
	background: string,
	playable: boolean,
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

export interface ISeason {
	id: number,
	title: string
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

export interface IActorNameCard {
	actorName: IActorName,
	isBeingEdited: boolean,
	isNew: boolean
}

export interface IActorGender {
	title: string,
	startDate: IDate,
	endDate: IDate
}

export interface IActorGenderCard {
	gender: IActorGender,
	isBeingEdited: boolean,
	isNew: boolean
}

export interface IActorTitle {
	title: string,
	ordinalNumber: string,
	startDate: IDate,
	endDate: IDate
}

export interface ActorTitle {

}

export interface AbilityScore {
	title: string,
	score: number
}

// Old implementation
export interface Timeline {
	title: string
}

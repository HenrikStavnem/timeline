export interface ITimelineCards {
	timelines: ITimelineCard[],
	statusCode: number
}

export interface ITimelineCard {
	id: number,
	title: string,
	image: string,
	author: string,
	slug: string
}
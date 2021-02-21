export interface ITimelineCards {
	timelines: ITimelineCard[],
	statusCode: number
}

export interface ITimelineCard {
	title: string,
	image: string,
	author: string,
	slug: string
}
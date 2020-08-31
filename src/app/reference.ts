export abstract class Reference {
	public shield: string = "<img src='http://dukendor.com/nadtas/timeline/graphics/shields/damlon.png' class='shield' />";

	constructor(
		public index: number,
		public type: string,
		public firstName: string,
		public lastName: string,
		public titles: Array<any>,
		public birthYear: number,
		public deathYear: number
		) {
	}
}

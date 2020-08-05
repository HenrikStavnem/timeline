import { Era } from 'src/app/interfaces/era';

export class Timeline {
	constructor(
		public id: number,
		public title: string,
		public description: string,
		public statusCode: string,
		public actors: Array<any>,
		public eras: Array<Era>
		) {

		}
}

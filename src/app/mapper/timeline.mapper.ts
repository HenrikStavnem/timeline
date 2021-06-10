import { Injectable } from '@angular/core';
import { IActor, IDate, ITimeline } from '../interfaces/timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineMapper {

	constructor() { }

	public transformTimeline(rawTimeline: ITimeline): ITimeline {
		rawTimeline.eras.forEach(era => {
			era.years.forEach(year => {
				year.months.forEach(month => {
					month.days.forEach(day => {
						day.entries.forEach(entry => {
							let currentDate: IDate = {
								era: era.era,
								year: year.year,
								month: month.month,
								day: day.day,
								exactness: day.exactness
							}

							entry.elements = [];

							while (entry.description.includes("{")) {
								let startIndex: number = 0,
									refStartIndex: number = entry.description.search("{"),
									refEndIndex: number = entry.description.search("}"),
									beforeRefString: string = entry.description.substring(startIndex, refStartIndex),
									rawReferenceString: string = entry.description.substring(refStartIndex, refEndIndex + 1),
									afterRefString: string = entry.description.substring(refEndIndex + 1, entry.description.length + 1),
									actor = this.transformToReference(rawReferenceString, rawTimeline.actors);

								entry.description = afterRefString;
								if (beforeRefString) {
									entry.elements.push({
										description: beforeRefString,
										type: 'text'
									});
								}
								if (actor) {
									let birthDate =  {
										era: actor.birthDate.era,
										year: actor.birthDate.year,
										month: actor.birthDate.month,
										day: actor.birthDate.day,
										exactness: actor.birthDate.exactness
									}
									entry.elements.push({
										type: 'character',
										name: actor.firstName + " " + actor.lastName,
										age: this.getRefenceAge(currentDate, birthDate),
										birthDate: {
											era: actor.birthDate.era,
											year: actor.birthDate.year,
											month: actor.birthDate.month,
											day: actor.birthDate.day,
											exactness: actor.birthDate.exactness
										},
										url: `/character/${actor.slug}`
									});
								}
							}

							if (entry.description) {
								entry.elements.push({
									description: entry.description,
									type: 'text'
								});
							}
						});
					});
				});
			});
		});

		let timeline: ITimeline = {
			actors: rawTimeline.actors,
			author: rawTimeline.author,
			description: rawTimeline.description,
			eras: rawTimeline.eras,
			id: rawTimeline.id,
			image: rawTimeline.image,
			statusCode: rawTimeline.statusCode,
			title: rawTimeline.title
		};

		return timeline;
	}

	private transformToReference(rawString: string, references: any): IActor {
		let cleanString = rawString.substring(1, rawString.length - 1),
			splittedString = cleanString.split('-'),
			referenceType = splittedString[0],
			settingsRawString = splittedString[1].split('|'),
			referenceIndex = parseInt(settingsRawString[0]),
			actor: IActor;

		switch(referenceType) {
			case 'char':
				actor = references.characters.find(x => x.id == referenceIndex);
				break;
		}
		return actor;
	}

	private getRefenceAge(currenDate: IDate, birthDate: IDate): string {
		if (currenDate.era !== birthDate.era) { // TODO: Check for exactness
			console.log("era is not compatible", currenDate.era, birthDate.era);
			return undefined;
		}

		if (currenDate.year === birthDate.year) {
			if (currenDate.month === birthDate.month) {
				if (currenDate.day === birthDate.day) {
					// born today!
					return 'Born today!';
				}
				if (currenDate.day > birthDate.day) {
					// born after today
					return currenDate.day - birthDate.day + ' days old';
				}
				// born same year, month, but after current day = not born yet
				return 'Born this year, but later';
			}
		}

		if (currenDate.year > birthDate.year) {
			return currenDate.year - birthDate.year + ' years old';
		}

		return 'Not born yet';
	}
}
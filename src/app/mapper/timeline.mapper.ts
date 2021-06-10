import { Injectable } from '@angular/core';
import { IActor, ITimeline } from '../interfaces/timeline';

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
									entry.elements.push({
										type: 'character',
										name: actor.firstName + " " + actor.lastName,
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
}
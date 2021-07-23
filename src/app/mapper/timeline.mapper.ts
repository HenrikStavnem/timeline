import { Injectable } from '@angular/core';
import { IActor, IActorName, IActorSettings, IActorTitle, IDate, ITimeline } from '../interfaces/timeline';

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

									let name: string;
									if (actor.settings?.overrideName) {
										name = actor.settings.overrideName;
									}
									else if (actor.names.length > 0) {
										name = this.getActorName(currentDate, actor.names)
									}
									else {
										name = `${actor.firstName} ${actor.lastName} (*)`;
									}

									entry.elements.push({
										type: 'character',
										//name: actor.settings?.overrideName ? actor.settings.overrideName : actor.firstName + " " + actor.lastName,
										//name: actor.settings?.overrideName ? actor.settings.overrideName : this.getActorName(currentDate, actor.names),
										name: name,
										image: actor.image,
										coverImage: actor.coverImage,
										age: this.getRefenceAge(currentDate, birthDate),
										showAge: actor.settings && 'showAge' in actor.settings ? actor.settings.showAge : true,
										title: this.getActorTitle(currentDate, actor.titles),
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

		console.log('transformed timeline', timeline);

		return timeline;
	}

	private transformToReference(rawString: string, references: any): IActor {
		let cleanString = rawString.substring(1, rawString.length - 1),
			splittedString = cleanString.split('-'),
			referenceType = splittedString[0],
			settingsRawString = splittedString[1].split('|'),
			referenceIndex = parseInt(settingsRawString[0]),
			actor: IActor,
			referenceSettings: IActorSettings;

		if (settingsRawString[1]) {
			referenceSettings = this.extractCharacterSettings(settingsRawString[1]);
		}

		switch(referenceType) {
			case 'char':
				actor = references.characters.find(x => x.id == referenceIndex);
				actor.settings = referenceSettings;
				break;
		}
		return actor;
	}

	private extractCharacterSettings(rawString: string): IActorSettings {
		let settings: IActorSettings = {},
			rawStrings: string[] = rawString.split(';'),
			overrideName: string = undefined,
			showAge: boolean = true,
			showTitle: boolean = undefined;

		rawStrings.forEach(raw => {
			let rawSplit: string[] = raw.split(':'),
				property: string = rawSplit[0],
				value: any = rawSplit[1];

			switch(property) {
				case 'name': overrideName = value; console.log('overrideName'); break;
				case 'age' || 'showAge': showAge = (value === 'true'); break; //TODO: Only use 'showAge'
				case 'title': showTitle = (value == 'true'); break;
				default: console.error(`'${property}' is a not a valid property name.`);
			}
		});

		if (overrideName) {
			settings.overrideName = overrideName;
		}
		if (showAge !== undefined) {
			settings.showAge = showAge;
		}
		if (showTitle) {
			settings.showTitle = showTitle;
		}

		return settings;
	}

	private validateDate(startDate: IDate, endDate: IDate, currentDate: IDate): boolean {
		let isStartDateValid = false,
			isEndDateValid = false;

		if (!startDate.startable) {
			// if not startable, it is 'since forever'
			isStartDateValid = true;
		}
		else {
			// date is not 'since forever'

			//if (startDate.era === currentDate.era) {
				if (startDate.year === currentDate.year) {
					if (startDate.month === currentDate.month) {
						if (startDate.day === currentDate.day) {
							isStartDateValid = true;
						}
						else if (startDate.day < currentDate.day) {
							isStartDateValid = true;
						}
					}
					else if (startDate.month < currentDate.month) {
						isStartDateValid = true;
					}
				}
				else if (startDate.year < currentDate.year) {
					isStartDateValid = true;
				}
			/*}
			else {
				// TODO: Eras before
				//debugger;
			}*/
		}

		if (!endDate.expirable) {
			// if not expirable, the date cannot end
			isEndDateValid = true;
		}
		else {
			// date can expire

			if (endDate.year === currentDate.year) {
				if (endDate.month === currentDate.month) {
					if (endDate.day === currentDate.day) {
						isEndDateValid = true;
					}
					else if (endDate.day > currentDate.day) {
						isEndDateValid = true;
					}
				}
				else if (endDate.month > currentDate.month) {
					isEndDateValid = true;
				}
			}

			if (endDate.year > currentDate.year) {
				isEndDateValid = true;
			}
		}

		//isEndDateValid = true; //TODO: just testing
		return (isStartDateValid && isEndDateValid);
	}

	getActorName(currenDate: IDate, names: IActorName[]): string {
		let result: string = 'No name given (#)';
		
		if (names.length === 0) {
			return result;
		}

		names.forEach(name => {
			let isValidDate = this.validateDate(name.startDate, name.endDate, currenDate);


			if (isValidDate) {
				result = `${name.firstName} ${name.lastName}`;
				return;
			}

			/*
			if (this.validateDate(name.startDate, name.endDate, currenDate)) {
				result = `${name.firstName} ${name.lastName}`;
				return;
			}
			*/
		});

		//result = 'No valid name for date found';

		return result;
		//return "No valid name for date found";
		//return `${names[0]?.firstName} ${names[0]?.lastName}`;
	}

	getActorTitle(currenDate: IDate, titles: IActorTitle[]) {
		// TODO: validate date to get titles.

		if (titles.length === 0) {
			return null;
		}

		let result: string = '';

		titles.forEach(title => {
			let isValidDate = this.validateDate(title.startDate, title.endDate, currenDate);

			if (isValidDate) {
				result = title.title;
				return;
			}
		});


		return result;
	}

	private getRefenceAge(currenDate: IDate, birthDate: IDate): string {
		if (currenDate.era !== birthDate.era) { // TODO: Check for exactness
			//console.log("era is not compatible", currenDate.era, birthDate.era);
			return 'Born in a different era';
			//return undefined;
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
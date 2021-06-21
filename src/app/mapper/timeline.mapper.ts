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

									entry.elements.push({
										type: 'character',
										//name: actor.settings?.overrideName ? actor.settings.overrideName : actor.firstName + " " + actor.lastName,
										name: actor.settings?.overrideName ? actor.settings.overrideName : this.getActorName(currentDate, actor.names),
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
			isStartDateValid = true;
		}
		else {
			// date is not 'since forever'

			if (startDate.era === currentDate.era) {
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
			}
			else {
				// TODO: Eras before
				//debugger;
			}
		}

		if (!endDate.expirable) {
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

	private validateDateOld(startDate: IDate, endDate: IDate, currentDate: IDate): boolean {		
		//TODO: Does not take eras and exactness into consideration
		let isStartDateValid = false,
			isEndDateValid = false;

		/*
		if (startDate.startable === undefined) {
			startDate.startable = false;
		}

		if (endDate.expirable === undefined) {
			endDate.expirable = false;
		}
		*/

		if (startDate.era === undefined || endDate.era === undefined) {
			//debugger;
		}

		if (!startDate.startable && !endDate.expirable) {
			console.log("ValidateDate: Property cannot start nor end, therefore always valid");
			return true;
		}

		/*
		if (!startDate.startable) {
			console.log('ValidateDate: Start date is unstartable');
			isStartDateValid = true;
		}

		if (!endDate.expirable) {
			console.log('ValidateDate: End date cannot expire');
			isEndDateValid = true;
		}*/

		// check if start date is valid
		if (startDate.startable || startDate.year === currentDate.year) {
			if (startDate.month === currentDate.month) {
				if (startDate.day <= currentDate.day) {
					console.log('ValidateDate: CurrentDate === StartDate', currentDate, startDate);
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
		else {
			console.log("booh: " + startDate.year + " >= " + currentDate.year);
		}

		// check if end date is valid
		if (endDate.expirable || endDate.year === currentDate.year) {
			if (endDate.month === currentDate.month) {
				if (endDate.day === currentDate.day) {
					console.log('ValidateDate: CurrentDate >= EndDate', currentDate, endDate);
					isEndDateValid = true;
				}
			}
			else if (endDate.month > currentDate.month) {
				isEndDateValid = true;
			}
		}
		else if (endDate.year > currentDate.year) {
			isEndDateValid = true;
		}

		return (isStartDateValid && isEndDateValid);
	}

	getActorName(currenDate: IDate, names: IActorName[]) {
		let result: string = 'No name given';
		
		if (names.length === 0) {
			console.log('Names are empty');
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

	getActorTitle(currenDate: IDate, names: IActorTitle[]) {
		// TODO: validate date to get titles.
		return '';
	}

	private getRefenceAge(currenDate: IDate, birthDate: IDate): string {
		if (currenDate.era !== birthDate.era) { // TODO: Check for exactness
			console.log("era is not compatible", currenDate.era, birthDate.era);
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
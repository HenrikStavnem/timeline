import { Pipe, PipeTransform } from '@angular/core';
import { IActor, IActors, IActorSettings, IDate } from '../interfaces/timeline';
import { Reference } from '../reference';

@Pipe({
	name: 'entryDescription'
})
/**
 * A pipe that transforms actor references in timeline entry texts into 
 */
export class EntryDescriptionPipe implements PipeTransform {
	private transformReferences(text: string, references: IActors, date: IDate) {
		var me = this;

		function transformReference(type: string, index: number, settings: IActorSettings) {
			let html: string = "";
			
			switch(type) {
				case "char":
					let character: IActor = references.characters.find(x => x.id == index),
						age: number = date.year - character.birthDate.year,
						title: string = null;

					age = getAge(character.birthDate, character.deathDate, date);
					
					if (character.titles) {
						title = getTitle(character.titles, date);
					}

					if (character.shield) {html = html + createShield(character.shield);}
					
					if (title) {html = html + title + " ";}
					html = html + `<a class='${character.type}' href='character/${character.slug}'>`; //TODO: href instead of routerLink
					if (settings?.overrideName) {
						html = html + settings?.overrideName;
					}
					else {
						html = html + character.firstName + " " + character.lastName;
					}
					html = html + "</a>";

					// TODO: The following doesn't work
					if (settings && settings.hasOwnProperty('showAge') && settings.showAge) {
						html = html + " <span class='gray'>(" + (age >= 0 ? age + " years old" : 'deceased') + ")</span>";
					}
					else if (age !== -1) {
						html = html + " <span class='gray'>(" + (age >= 0 ? age + " years old" : 'deceased') + ")</span>";
					}


					break;
				case "location": 
					console.log("Reference is a location");
					//TODO: NYI
				/*
					if (reference.shield) {html = html + createShield(reference.shield);}
					html = html + `<a class='${reference.type}'>`;
					html = html + reference.firstName;
					html = html + "</a>";
				*/
					break;
				case "item": 
				console.log("Reference is an item");
					//TODO: NYI
					html = "item";
					break;
				default:
					console.error("Reference type not recognized: " + type);
					break;
			}

			return html;
		}

		function validateDate(startDate: IDate, endDate: IDate, currentDate: IDate) {
			//TODO: Does not take eras and exactness into consideration

			let isStartDateValid = false,
				isEndDateValid = false;

			// check if start date is valid
			if (startDate.year === currentDate.year) {
				if (startDate.month === currentDate.month) {
					if (startDate.day <= currentDate.day) {
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
			if (endDate.year === currentDate.year) {
				if (endDate.month === currentDate.month) {
					if (endDate.day >= currentDate.day) {
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

		function getTitle(titles: Array<any>, currentDate: IDate) {
			let title = "";

			titles.forEach(titleObj => {
				if (validateDate(titleObj.startDate, titleObj.endDate, currentDate)) {
					title = titleObj.title;
					return;
				}
			});

			return title;
		}

		function getAge(birthDate: IDate, deathDate: IDate, currentDate: IDate) {
			// TODO: Use eras, monts and days too
			if (currentDate.year > deathDate.year) {
				return -1;
			}

			// TODO: Instead, return {status: (alive, dead, unknown), age: age}

			return date.year - birthDate.year;
		}

		function createShield(shield: string) {
			return `<img class="shield" src="${shield}" alt="" />`;
		}

		// TODO: Clean-up/refactor this
		while (text.includes("{")) {
			let startIndex: number,
				endIndex: number,
				rawReferenceString: string,
				referenceString: string,
				splittedString: string[],
				splittedString2: string[],
				referenceIndex: number,
				referenceType: string,
				referenceSettingsString: string,
				referenceSettings: IActorSettings,
				newString: string;

			startIndex = text.search("{");
			endIndex = text.search("}");
			rawReferenceString = text.substring(startIndex, endIndex + 1);
			referenceString = rawReferenceString.substring(1, rawReferenceString.length - 1);
			
			splittedString = referenceString.split('-');

			referenceType = splittedString[0];

			splittedString2 = splittedString[1].split('|');
			
			referenceIndex = parseInt(splittedString2[0]);

			referenceSettingsString = splittedString2[1];

			if (referenceSettingsString) {
				referenceSettings = this.extractCharacterSettings(referenceSettingsString);
			}

			newString = transformReference(referenceType, referenceIndex, referenceSettings) ;

			text = text.replace(rawReferenceString, newString);
		}
		return text;
	}

	extractCharacterSettings(rawString: string): IActorSettings {
		let settings: IActorSettings = {},
			rawStrings: string[] = rawString.split(';'),
			overrideName: string = undefined,
			showAge: boolean = undefined,
			showTitle: boolean = undefined;

		console.log("rawStrings", rawStrings);

		rawStrings.forEach(raw => {
			let rawSplit: string[] = raw.split(':'),
				property: string = rawSplit[0],
				value: any = rawSplit[1];

			switch(property) {
				case 'name': overrideName = value; console.log('overrideName'); break;
				case 'age': showAge = (value == 'true'); break;
				case 'title': showTitle = (value == 'true'); break;
				default: console.error(`'${property}' is a not a valid property name.`);
			}
		});

		if (overrideName) {
			settings.overrideName = overrideName;
		}
		if (showAge) {
			console.log("Character has showAge and it is: " + showAge);
			settings.showAge = showAge;
		}
		if (showTitle) {
			settings.showTitle = showTitle;
		}

		return settings;
	}

	transform(value: string, references: IActors, date: IDate): string {
		return this.transformReferences(value, references, date);
	}

}

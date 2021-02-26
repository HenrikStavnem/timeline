import { Pipe, PipeTransform } from '@angular/core';
import { IActor, IActors, IDate } from '../interfaces/timeline';
import { Reference } from '../reference';

@Pipe({
	name: 'entryDescription'
})
/**
 * A pipe that transforms actor references in timeline entry texts into 
 */
export class EntryDescriptionPipe implements PipeTransform {
	private transformReferences(text: string, references: IActors, date: any) {
		var me = this;

		function transformReference(type, index) {
			let html: string = "";
			
			switch(type) {
				case "char": 
					let character: IActor = references.characters.find(x => x.id == index);

					let age: number = date.year - character.birthYear; //me.date - reference.birthYear;
					let title: string = null
					
					if (character.titles) {
						title = getTitle(character.titles, date);
					}

					if (character.shield) {html = html + createShield(character.shield);}
					//if (reference.title) {html = html + reference.title + " ";}
					if (title) {html = html + title + " ";}
					html = html + `<a class='${character.type}' href='character/${character.slug}'>`; //TODO: href instead of routerLink
					html = html + character.firstName + " " + character.lastName;
					html = html + "</a>";
					html = html + " <span class='gray'>(" + age + " years old)</span>";
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

		function createShield(shield: string) {
			return `<img class="shield" src="${shield}" alt="" />`;
		}

		while (text.includes("{")) {
			let startIndex: number,
				endIndex: number,
				rawReferenceString: string,
				referenceString: string,
				splittedString: string[],
				referenceIndex: number,
				referenceType: string,
				newString: string;

			startIndex = text.search("{");
			endIndex = text.search("}");
			rawReferenceString = text.substring(startIndex, endIndex + 1);
			referenceString = rawReferenceString.substring(1, rawReferenceString.length - 1);
			
			splittedString = referenceString.split('-');

			referenceType = splittedString[0];
			
			referenceIndex = parseInt(splittedString[1]);

			newString = transformReference(referenceType, referenceIndex) ;

			text = text.replace(rawReferenceString, newString);
		}
		return text;
	}

	transform(value: string, references: IActors, year: number): string {
		return this.transformReferences(value, references, year);
	}

}

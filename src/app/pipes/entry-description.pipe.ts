import { Pipe, PipeTransform } from '@angular/core';
import { IActor, IActors } from '../interfaces/timeline';
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

		function getTitle(titles: Array<any>, date: any) {
			//TODO: This doesn't not take eras, months and days into consideration and cannot expire
			let title = "";

			if (titles.length > 0) {
//				debugger;
			}

			titles.forEach(titleObj => {
				if (
					titleObj.startDate.year <= date.year &&
					titleObj.endDate.year >= date.year
					) {
					console.log('Start date is perfect');

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

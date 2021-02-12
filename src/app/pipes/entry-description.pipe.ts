import { Pipe, PipeTransform } from '@angular/core';
import { Reference } from '../reference';

@Pipe({
	name: 'entryDescription'
})
export class EntryDescriptionPipe implements PipeTransform {
	private transformReferences(text: string, references: Array<Reference>, year: number) {
		var me = this;

		function transformReference(reference: Reference) {
			let html: string = "";

			console.log("transformReference reference", reference);
			
			switch(reference.type) {
				case "person": 
					console.log("person");
					// TODO: Fix to current year 

					//html = "Ham Shafeeq altså";
					
					//html = reference.firstName + " " + reference.lastName;

					let age: number = year - reference.birthYear; //me.date - reference.birthYear;
					let title: string = null
					
					if (reference.titles) {
						title = getTitle(reference.titles, year);
					}

					if (reference.shield) {html = html + createShield(reference.shield);}
					//if (reference.title) {html = html + reference.title + " ";}
					if (title) {html = html + title + " ";}
					html = html + `<a class='${reference.type}'>`;
					html = html + reference.firstName + " " + reference.lastName;
					html = html + "</a>";
					html = html + " <span class='gray'>(" + age + " years old)</span>";
					break;
				case "location": 
				if (reference.shield) {html = html + createShield(reference.shield);}
					html = html + `<a class='${reference.type}'>`;
					html = html + reference.firstName;
					html = html + "</a>";
					break;
				default:
					console.error("Reference type not recognized: " + reference.type);
					break;
			}

			return html;
		}

		function getTitle(titles: Array<any>, year: number) {
			let title = "";

			titles.forEach(date => {
				if (date.year <= year) {
					title = date.title;
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
				reference: Reference,
				newString: string;

			startIndex = text.search("{");
			endIndex = text.search("}");
			rawReferenceString = text.substring(startIndex, endIndex + 1);
			referenceString = rawReferenceString.substring(1, rawReferenceString.length - 1);
			
			splittedString = referenceString.split('-');
			
			referenceIndex = parseInt(splittedString[1]);

			console.log("references", references);

			reference = references.find(x => x.id == referenceIndex);

			//reference = references[referenceIndex];

			newString = reference ? transformReference(reference) : "NOT FOUND. Id: " + referenceIndex;

			text = text.replace(rawReferenceString, newString);
		}
		return text;
	}

	transform(value: string, references: Array<any>, year: number): string {
		return this.transformReferences(value, references, year);
	}

}

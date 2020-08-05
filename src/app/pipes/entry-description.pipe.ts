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
			
			switch(reference.type) {
				case "person": 
					// TODO: Fix to current year 
					let age: number = year - reference.birthYear; //me.date - reference.birthYear;

					if (reference.shield) {html = html + createShield(reference.shield);}
					if (reference.title) {html = html + reference.title + " ";}
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

		function createShield(shield: string) {
			return `<img class="shield" src="${shield}" alt="" />`;
		}

		while (text.includes("{")) {
			let startIndex: number = text.search("{"),
				endIndex: number = text.search("}"),
				rawReferenceString: string = text.substring(startIndex, endIndex + 1),
				referenceIndex: number = parseInt(rawReferenceString.substring(1, rawReferenceString.length - 1)),
				reference: Reference = references[referenceIndex],
				referenceString: string = reference ? transformReference(reference) : "NOT FOUND";

			text = text.replace(rawReferenceString, referenceString);
		}
		return text;
	}

	transform(value: string, references: Array<any>, year: number): string {
		return this.transformReferences(value, references, year);
	}

}

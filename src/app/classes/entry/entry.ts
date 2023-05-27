import { Reference } from '../../reference';
import { Person } from '../../classes/person';
import { Location } from '../../classes/location';
import { OnInit, Directive } from '@angular/core';

@Directive()
export class Entry {
	public id: number;
	public titles: Array<any>;
	public description: string;
	public type: string;
	public date: number;

	public portraitUrl: string = "http://common.dukendor.com/avatars/visitor.png";

	private transformReferences(text: string, references: Array<Reference>) {
		var me = this;

		function transformReference(reference: Reference) {
			let html: string = "";
			
			switch(reference.type) {
				case "person": 
					let age: number = me.date - reference.birthYear;

					html = html + reference.shield;
					//html = html + reference.title + " ";
					html = html + `<a class='${reference.type}'>`;
					html = html + reference.firstName + " " + reference.lastName;
					html = html + "</a>";
					html = html + "<span class='gray'>(" + age + " years old)</span>";
					break;
				case "location": 
					html = html + reference.shield;
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
}

import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EditIcon } from '../icons/Edit.component';

@Component({
	selector: 'paragraph',
	imports: [CommonModule, EditIcon, CardComponent],
	standalone: true,
	templateUrl: './paragraph.component.html',
	styleUrls: ['./paragraph.component.scss']
})
export class Paragraph implements OnInit {
	@Input() text: string;
	textElements: any[] = [];
	timelineSlug: string = "mirror";

	ngOnInit(): void {
	}

	ngOnChanges() {
		this.mapDescription();
	}

	constructor() {
	}

	mapDescription(): void {
		interface Attribues {
			bold?: boolean,
			italic?: boolean
		}
		interface Part {
			type: string,
			character?: any,
			insert?: string
			location?: any,
			attributes?: Attribues,
		}

		console.log(this.text);

		if (!this.text) {
			console.error('text is undefined...');
			return;
		}

		try {
			const textSafe = this.text.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
			const json = JSON.parse(textSafe);

			json.ops.forEach((part: Part) => {
				if (part.type === 'text') {
					this.textElements.push({
						type: 'text',
						text: this.createBreaksInText(part.insert),
						attributes: {
							bold: part.attributes?.bold,
							italic: part.attributes?.italic
						}
					});
				}
	
				if (part.type === 'character') {
					this.textElements.push({
						type: 'character',
						character: {
							name: part.character.name,
							image: part.character.image,
							url: `/timeline/${this.timelineSlug}/${part.character.slug}`
						}
					});
				}
	
				if (part.type === 'location') {
					this.textElements.push({
						type: 'location',
						location: {
							name: part.location.name,
							image: part.location.image,
							url: `/timeline/${this.timelineSlug}/rhys`
						}
					});
				}
			});
	
		} catch (error) {
			console.error(error);
		}
	}

	private createBreaksInText(text: string) {
		const needle = /\\n/gi;
		const replaceWith = '<br />';
		return text.replace(needle, replaceWith);
	}
}

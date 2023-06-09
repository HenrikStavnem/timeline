import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
	character: IActor;
	timelineSlug: string;
	description: any[];

	constructor(
		private route: ActivatedRoute,
		private sidebarService: SidebarService,
		private timelineService: TimelineService
	) {
	}

	ngOnInit(): void {
		let characterSlug: string;
		this.route.paramMap.subscribe(params => {
			this.timelineSlug = params.get('id');
			characterSlug = params.get('id2');
		});
		
		this.timelineService.getCharacter(characterSlug).subscribe((character: any) => {
			this.character = character.character;
		},
		error => {
			console.error('api error: ', error);
		});

		// TODO: Move once done testing
		this.description = new Array();
		this.mapDescription();
	}

	getModifier(value: number): string {
		const modifierValue =  Math.floor((value - 10) / 2);

		return ((modifierValue > -1) ? "+" : "") + modifierValue;
	}

	onEditClick() {
		this.sidebarService.openCharacterPage(this.character);
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
			attributes?: any //Attribues,
		}
		
		const json = {"ops":[
			{
				"attributes": {"bold":true},
				"insert":"Treasure.",
				"type": "text"
			},
			{
				"insert":"\nThe owner of whatever card destroys this card draws a Treasure card\n",
				"type": "text"
			},
			{
				"insert":"Bold",
				"type": "text",
				"attributes": {"bold":true},
			},
			{
				"insert":"Italic",
				"type": "text",
				"attributes": {"italic":true},
			},
			{
				"insert":"Bold AND Italic",
				"type": "text",
				"attributes": {"bold":true, "italic":true},
			},
			{
				"insert":"\nA longer, more intricate text\nwith line breaks\nand more!\n",
				"type": "text"
			},
			{
				"insert":"\n\nText with a character mention namely",
				"type": "text"
			},
			{
				// "insert":"\nA longer, more intricate text\nwith line breaks\nand more!\n",
				"type": "character",
				"character": {
					"name": "Rorador",
					"image": "https://i.pinimg.com/564x/49/bf/71/49bf713ab6db6a792686974d5d1bd865.jpg",
					"slug": "daved"
				}
			},
			{
				"insert":"that seems perfectly natural. Oh, and",
				"type": "text"
			},
			{
				// "insert":"\nA longer, more intricate text\nwith line breaks\nand more!\n",
				"type": "character", //TODO: "character" or "reference"??
				"character": {
					"name": "Dyri",
					"image": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31a92255-861d-40f4-ad78-a2efd309b0d2/dev3zkt-d974f486-ca26-4f55-9d56-784fcfaee787.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxYTkyMjU1LTg2MWQtNDBmNC1hZDc4LWEyZWZkMzA5YjBkMlwvZGV2M3prdC1kOTc0ZjQ4Ni1jYTI2LTRmNTUtOWQ1Ni03ODRmY2ZhZWU3ODcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XdnK_OoMysU5O0gFVDmzHzPM-auNRJtpHlCNqFyH1DE",
					"slug": "daved"
				}
			},
			{
				"insert":"is here, ",
				"type": "text"
			},
			{
				"insert":"too!\n",
				"type": "text",
				"attributes": {"italic":true},
			},
			{
				"type": "location",
				"location": {
					"name": "Belmonor Island",
					"image": "https://cdna.artstation.com/p/assets/images/images/017/886/968/large/harrison-yinfaowei-may-7.jpg?1557739385"
				}
			},
			{
				"insert":"is a place where ",
				"type": "text"
			},
			{
				"type": "character", //TODO: "character" or "reference"??
				"character": {
					"name": "Worrec",
					"image": "https://i.pinimg.com/564x/9f/9a/36/9f9a36f48f5dea2cb741b5f8c7ad2c1e.jpg",
					"slug": "daved"
				}
			},
			{
				"insert":"grew up ",
				"type": "text"
			},
		]};

		json.ops.forEach((part: Part) => {
			if (part.type === 'text') {
				this.description.push({
					type: 'text',
					text: this.createBreaksInText(part.insert),
					attributes: {
						bold: part.attributes?.bold,
						italic: part.attributes?.italic
					}
				});
			}

			if (part.type === 'character') {
				this.description.push({
					type: 'character',
					character: {
						name: part.character.name,
						image: part.character.image,
						url: `/timeline/${this.timelineSlug}/${part.character.slug}`
					}
				});
			}

			if (part.type === 'location') {
				this.description.push({
					type: 'location',
					location: {
						name: part.location.name,
						image: part.location.image,
						url: `/timeline/${this.timelineSlug}/rhys`
					}
				});
			}
		});

		console.log(this.description);
	}

	private createBreaksInText(text: string) {
		const needle = /\n/gi;
		const replaceWith = '<br />';
		return text.replace(needle, replaceWith);
	}

}

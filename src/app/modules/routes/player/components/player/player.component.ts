import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

	playerName: string = "N/A";
	playerDescription: string;
	characterCards: any[];
	image: string;
	coverImage: string;

	description: any[] = [{
		type: 'text',
		text: 'Yes',
		attributes: {
			bold: true,
			italic: true
		}
	}];

	constructor(
		private route: ActivatedRoute,
		private sidebarService: SidebarService,
		private timelineService: TimelineService,
		public translate: TranslateService
	) { }

	ngOnInit(): void {
		let slug: string;
		this.route.paramMap.subscribe(params => {
			slug = params.get('id');
		});

		this.timelineService.getPlayer(slug).subscribe((result: any) => {
			this.playerName = result.name;
			this.playerDescription = result.description;
			this.characterCards = result.characters;
			this.image = result.image;
			this.coverImage = result.coverImage;
		});

		this.sidebarService.change.subscribe((eventData: any) => {
			if (eventData.isOpen === false) {
				this.characterCards.forEach(card => {
					card.isBeingEdited = false;
				});
			}
		});
	}

	onEditCharacterClick(character: IActor) {
		character.isBeingEdited = true;

		this.sidebarService.openCharacterPage(character);
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
	characterCards: IActor[];
	timelineSlug: string;

	constructor(
		private route: ActivatedRoute,
		private sidebarService: SidebarService,
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {

		this.timelineSlug = this.route.snapshot.params.id;
		
		this.timelineService.getCharactersByTimeline(this.timelineSlug, '').subscribe((characters: any) => {
			console.log('characters', characters);

			this.characterCards = characters.characters;
		}),
		error => {
			console.error('api error', error);
		}

		this.sidebarService.change.subscribe((eventData: any) => {
			if (eventData.isOpen === false) {
				this.characterCards.forEach(card => {
					card.isBeingEdited = false;
				});
			}
		});

		this.timelineService.change.subscribe((eventData: any) => {
			console.log('must update?', eventData.charactersUpdated);
			if (eventData.charactersUpdated) {
				this.timelineService.getCharactersByTimeline(this.timelineSlug, '').subscribe((characters: any) => {
					console.log('characters', characters);
		
					this.characterCards = characters.characters;
				}),
				error => {
					console.error('api error', error);
				}
			}
		});
	}

	onEditCharacterClick(character: IActor) {
		character.isBeingEdited = true;

		this.sidebarService.openCharacterPage(character);
	}

}

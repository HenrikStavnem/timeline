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

	constructor(
		private route: ActivatedRoute,
		private sidebarService: SidebarService,
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {

		let timelineSlug = this.route.snapshot.params.id;
		
		this.timelineService.getCharactersByTimeline(timelineSlug, '').subscribe((characters: any) => {
			console.log('characters', characters);

			this.characterCards = characters.characters;
		}),
		error => {
			console.error('api error', error);
		}
	}

	onEditCharacterClick(character: IActor) {
		console.log('character', character);

		character.isBeingEdited = true;

		//this.sidebarService.openSidebarPage('test2');
		this.sidebarService.openCharacterPage(character);
	}

}

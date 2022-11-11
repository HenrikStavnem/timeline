import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'locations',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

	locationCards: [] = [];
	image: string;
	coverImage: string;
	timelineSlug: string = "";

	constructor(
		private route: ActivatedRoute,
		// private sidebarService: SidebarService,
		private timelineService: TimelineService,
		public translate: TranslateService
	) { }

	ngOnInit(): void {
		let slug: string;
		this.route.paramMap.subscribe(params => {
			slug = params.get('id');

			this.timelineSlug = params.get('id');
		});

		this.timelineService.getLocations(slug).subscribe((result: any) => {
			// this.playerName = result.name;
			// this.playerDescription = result.description;
			// this.characterCards = result.characters;
			// this.image = result.image;
			// this.coverImage = result.coverImage;

			// console.log('characters', this.characterCards);
			console.log(result);
			this.locationCards = result;
		});

		// this.sidebarService.change.subscribe((eventData: any) => {
		// 	if (eventData.isOpen === false) {
		// 		this.characterCards.forEach(card => {
		// 			card.isBeingEdited = false;
		// 		});
		// 	}
		// });
	}
}

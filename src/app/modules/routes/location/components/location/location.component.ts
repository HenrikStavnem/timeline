import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'locations',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

	name: string;
	description: string;
	image: string;
	coverImage: string;
	timelineSlug: string = "";
	locationSlug: string = "";

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
			this.locationSlug = params.get('id2');
		});

		this.timelineService.getLocation(this.timelineSlug, this.locationSlug).subscribe((result: any) => {
			this.name = result.name;
			this.description = result.description;
			// this.characterCards = result.characters;
			// this.image = result.image;
			this.coverImage = result.coverImage;

			// console.log('characters', this.characterCards);
			console.log(result);
			// this.locationCards = result;
		});
	}
}

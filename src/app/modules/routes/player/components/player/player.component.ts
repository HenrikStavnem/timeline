import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

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

	constructor(
		private route: ActivatedRoute,
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
	}
}

import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';
// import { ActivatedRoute } from '@angular/router';
// import { IActor } from 'src/app/interfaces/timeline';
// import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'players',
	templateUrl: './players.component.html',
	styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

	playerCards: any[];
	image: string;
	coverImage: string;

	constructor(
		// private route: ActivatedRoute,
		// private sidebarService: SidebarService,
		private timelineService: TimelineService,
		public translate: TranslateService
	) { }

	ngOnInit(): void {
		this.timelineService.getPlayers().subscribe((result: any) => {
			this.playerCards = result;
			console.table(result);
		});
	}
}

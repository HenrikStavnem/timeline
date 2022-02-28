import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { ITimelineCard, ITimelineCards } from 'src/app/interfaces/timelinecard'
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	timelineCards: ITimelineCard[];

	constructor(
		private timelineService: TimelineService,
		public translate: TranslateService
	) { }

	ngOnInit(): void {
		this.timelineService.getTimelines().subscribe((timelines: ITimelineCards) => {
			console.log("INDEX:::", timelines);
			this.timelineCards = timelines.timelines;
		},
		error => {
			console.error('api error: ', error);
		});
	}
}

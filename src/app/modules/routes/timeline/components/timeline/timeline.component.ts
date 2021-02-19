import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { ITimeline } from 'src/app/interfaces/timeline'

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
	timeline: ITimeline;

	constructor(
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {
		this.timelineService.getTimeline().subscribe((timeline: ITimeline) => {
			console.log("DATA:::", timeline);
			this.timeline = timeline;
			console.log("DATA:::", this.timeline);
		},
		error => {
			console.error('api error: ', error);
		});
	}

}

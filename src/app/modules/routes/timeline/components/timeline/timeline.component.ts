import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { ITimeline } from 'src/app/interfaces/timeline'
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
	timeline: ITimeline;

	constructor(
		private timelineService: TimelineService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		let slug: string;
		this.route.paramMap.subscribe(params => {
			slug = params.get('id');
		});

		this.timelineService.getTimeline(slug ? slug : undefined).subscribe((timeline: ITimeline) => {
			this.timeline = timeline;
		},
		error => {
			console.error('api error: ', error);
		});
	}

}

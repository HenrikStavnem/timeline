import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';

import { Entry } from '../../classes/entry/entry';
import { TimelineService } from '../../services/timeline.service';
import { Timeline } from '../../classes/timeline';
import { Reference } from '../../reference';

@Component({
	selector: 'entrylist',
	templateUrl: './entrylist.component.html',
	styleUrls: ['./entrylist.component.scss'],
	providers: [TimelineService]
})

export class EntrylistComponent implements OnInit {

	show: boolean = true;

	public title: string;
	public description: string;
	public eras: string = "TEST";
	public timeline: Timeline = new Timeline(null, "N/A", "N/A", "N/A", [], []);
	public references: Array<Reference>;
	
	constructor(private timelineService: TimelineService) {
		
		console.log("entrylist constructor");

		this.timelineService.getTimeline().subscribe((data: Timeline) => {
			let newTimeline = new Timeline(data.id, data.title, data.description, data.statusCode, data.actors, data.eras);

			console.log("timeline", newTimeline);

			this.timeline = newTimeline;
			this.references = data.actors;
		},
		error => {
			console.error('api error: ', error);
		});
	}
	

	ngOnInit(): void {
		console.log("ngOnInit");
	}

	getRelativeDate(date: number, title: string) {
		let result: string;

		if (date < 0) {
			result = Math.abs(date) + (date == -1 ? " day" : " days") + " before " + title;
		}
		else if (date == 0) {
			result = "The Day of " + title;
		}
		else {
			result = date + " days after " + title;
		}
		return result;
	}

}

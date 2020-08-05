import { Component } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TimelineService]
})
export class AppComponent {
	public title: string = 'N/A';
	public description: string = "N/A";
	public headerImage: string = "https://cdnb.artstation.com/p/assets/images/images/002/222/455/large/sasha-tudvaseva-ruby-grove-2.jpg?1458905294";

	constructor(private timelineService: TimelineService) {
		this.getHeaderInfo();
	}

	setHeaderImage() {
		let styles = {
			"background-image": "url('" + this.headerImage + "')"
		};
		return styles;
	}

	getHeaderInfo() {
		interface TimelineInfo {
			title: string,
			description: string,
			image: string
		}

		this.timelineService.getTimelineInfo().subscribe((data: TimelineInfo) => {
			this.title = data.title;
			this.description = data.description;
			this.headerImage = data.image;
		},
		error => {
			console.log('error: ', error)
		});
	}
}

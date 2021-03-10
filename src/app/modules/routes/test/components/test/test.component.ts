import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	constructor(
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {
	}

	createEventBtnClick() {
		console.log("createEventBtnClick");

		this.timelineService.createEvent("Character test: {char-1}.").subscribe((message: string) => {
			console.log("Message", message);
		},
		error => {
			console.error('api error: ', error);
		});
	}

}

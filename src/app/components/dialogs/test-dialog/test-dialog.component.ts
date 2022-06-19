import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';
import { Timeline } from 'src/app/classes/timeline';

@Component({
	selector: 'app-test-dialog',
	templateUrl: './test-dialog.component.html',
	styleUrls: ['./test-dialog.component.scss'],
})
export class TestDialogComponent implements OnInit {
	testFormControl = new UntypedFormControl('');

	constructor(private timelineService: TimelineService) {
	}

	ngOnInit(): void {
	}

	onSaveClick(): void {
		let value = this.testFormControl.value;
		console.log("input value is " + value);

		let timeline: Timeline = new Timeline(9000, "jimmy", "desc", "200", [], null);

		/*
		this.timelineService.updateTimelineInfo(timeline).subscribe((data: any) => {
			console.log("data from update", data);
		});
		*/

		//this.timelineService.updateTimelineInfo(timeline).subscribe((data: any) => this.config = {

		//}

		/*
		this.timelineService.updateTimelineInfo().subscribe((data: any) => {
			console.log("Done");
		});
		*/


	}

}

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-manage-timeline',
	templateUrl: './manage-timeline.component.html',
	styleUrls: ['./manage-timeline.component.scss']
})
export class ManageTimelineComponent implements OnInit {
	form: UntypedFormGroup;

	constructor(
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {
		this.form = new UntypedFormGroup({
			Title: new UntypedFormControl('', [ //title = form.title
				Validators.required,
				Validators.minLength(2)
			]),
			Description: new UntypedFormControl('', [ //title = form.title
				Validators.required,
				Validators.minLength(2)
			])
		});
	}

	onSubmit() {
		console.log("Submit clicked");

		if (this.form.valid) {
			let title = this.form.get('Title').value,
				description = this.form.get('Description').value;

			this.timelineService.updateTimeline(4, title, description).subscribe((message: any) => {
				console.log(message);
			},
			error => {
				console.error('api error: ', error);
			});
		}
		else {
			alert('Not valid');
		}
	}

}

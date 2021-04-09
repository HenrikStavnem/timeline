import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { ITimeline } from 'src/app/interfaces/timeline'
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
	timeline: ITimeline;
	canEdit: boolean = true; // TODO: Depends on logged-in user privileges
	isEditingHeader: boolean = false;

	headerForm: FormGroup;
	isFormDirty: boolean = false;

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
			console.log('timeline',timeline);

			this.headerForm = new FormGroup({
				Title: new FormControl(this.timeline?.title, [
					Validators.required,
					Validators.minLength(2)
				]),
				Description: new FormControl(this.timeline?.description, [ 
				])
			});

			this.onChanges();
		},
		error => {
			console.error('api error: ', error);
		});
	}

	onHeaderEditClick(): void {
		this.isEditingHeader = !this.isEditingHeader;
	}

	onChanges(): void {
		this.headerForm.valueChanges.subscribe(value => {
			this.isFormDirty = this.headerForm.dirty;
		});
	}

	onTextAreaInput(event): void {
		let target = event.target;
		console.log("Textarea input", event);
		let style = target.getAttribute("style");
		console.log("Textarea style", style);
		//target.scrollHeight = target.height
		//https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php
	}

	onSubmit(): void {
		console.log("submit clicked");

		if (this.headerForm.valid) {
			let id = this.timeline.id,
				title = this.headerForm.get('Title').value,
				description = this.headerForm.get('Description').value;

			this.timeline.title = title;
			this.timeline.description = description;

			this.timelineService.updateTimeline(id, title, description).subscribe((message: any) => {
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

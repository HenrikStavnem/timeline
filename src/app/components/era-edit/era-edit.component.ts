import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'era-edit',
	templateUrl: './era-edit.component.html',
	styleUrls: ['./era-edit.component.scss']
})
export class EraEditComponent implements OnInit {
	form: FormGroup;

	isAsideOpen: boolean = false;
	openAsideId: string = "";

	coverImage: string = "";

	ngOnInit(): void {
		this.form = new FormGroup({
			Title: new FormControl('', [
			]),
			Description: new FormControl('', [
			]),
			CoverImage: new FormControl('', [
			]),
		});
	}

	constructor(public toastService: ToastService, private timelineService: TimelineService,) {
	}

	onSetImageClick(): void {
		this.coverImage = this.form.get('CoverImage').value;
	}

	onSaveEraClick(): void {
		let era = {
			title: this.form.get('Title').value,
			description: this.form.get('Description').value,
			coverImage: this.form.get('CoverImage').value,
			timelineId: 11
		};

		console.log(era);

		//this.toastService.updateToast('Save era is not yet implemented');

		this.timelineService.createEra(era).subscribe((message: string) => {
			console.log("Message", message);
			this.toastService.updateToast('Event saved');
		},
		error => {
			this.toastService.updateToast('Error. See console');
			console.error('api error: ', error);
		});
	}

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(id: string): void {
		this.openAsideId = id;
		this.isAsideOpen = true;
	}

	closeAside = (): void => {
		this.isAsideOpen  = false;
	}
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'era-edit',
	templateUrl: './era-edit.component.html',
	styleUrls: ['./era-edit.component.scss']
})
export class EraEditComponent implements OnInit {
	form: UntypedFormGroup;

	isAsideOpen: boolean = false;
	openAsideId: string = "";

	coverImage: string = "";

	ngOnInit(): void {
		this.form = new UntypedFormGroup({
			Title: new UntypedFormControl('', [
			]),
			Description: new UntypedFormControl('', [
			]),
			CoverImage: new UntypedFormControl('', [
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

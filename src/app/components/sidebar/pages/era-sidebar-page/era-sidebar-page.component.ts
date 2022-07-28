import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Era } from 'src/app/interfaces/era';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'era-sidebar-page',
	templateUrl: './era-sidebar-page.component.html',
	styleUrls: ['./era-sidebar-page.component.scss']
})
export class EraSidebarPageComponent implements OnInit {
	@Input() era: Era = null;
	@Input() timelineId: number = null;

	eras: any[];

	form: UntypedFormGroup = new UntypedFormGroup({
		Title: new UntypedFormControl('', [
			Validators.required,
			Validators.minLength(1)
		]),
		Description: new UntypedFormControl('', [
		]),
		ImageUrl: new UntypedFormControl('', [
		])
	});

	constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private timelineService: TimelineService, private toastService: ToastService) {
		// TODO: This part doesn't work
		
		this.route.params.subscribe(params => {
			console.log('params', params);
		});
		// The above part doesn't work
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.era) {
			this.setFormData();
		}
	}

	private setFormData(): void {
		this.form.get('Title').setValue(this.era.title);
		this.form.get('Description').setValue(this.era.description);
		this.form.get('ImageUrl').setValue(this.era.image);
	}

	onSaveChangesClick(): void {
		this.toastService.updateToast('Under development');

		//this.timelineService.createEra();
	}

	onSaveNewClick(): void {
		this.toastService.updateToast('Under development');

		let newEra: Era = {
			title: this.form.get('Title').value,
			description: this.form.get('Description').value,
			image: this.form.get('ImageUrl').value,
			years: null,
			timelineId: this.timelineId
		};

		this.timelineService.createEra(newEra).subscribe((result: any) => {
			console.log(result);
			this.toastService.updateToast('Era saved');
		});;
	}
}
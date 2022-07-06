import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'era-sidebar-page',
	templateUrl: './era-sidebar-page.component.html',
	styleUrls: ['./era-sidebar-page.component.scss']
})
export class EraSidebarPageComponent implements OnInit {
	@Input() era = null;

	eras: any[];

	constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private timelineService: TimelineService, private toastService: ToastService) {
		// TODO: This part doesn't work
		
		this.route.params.subscribe(params => {
			console.log('params', params);
		});

		// The above part doesn't work
	}

	ngOnInit(): void {
		// this.timelineService.getEras('').subscribe((result: any) => {
		// 	this.eras = result;
		// });
	}
}
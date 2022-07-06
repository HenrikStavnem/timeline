import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActor, IEra } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'eras-sidebar-page',
	templateUrl: './eras-sidebar-page.component.html',
	styleUrls: ['./eras-sidebar-page.component.scss']
})
export class ErasSidebarPageComponent implements OnInit {
	@Input() routeParamId: string;

	eras: any[];
	selectedEra = null;
	timelineId: number = null;

	isAsideOpen: boolean = false;

	constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private timelineService: TimelineService, private toastService: ToastService) {
		// TODO: This part doesn't work
		
		this.route.params.subscribe(params => {
			console.log('params', params);
		});

		// The above part doesn't work
	}

	ngOnInit(): void {
		let timelineSlug = this.routeParamId;

		this.timelineService.getTimelineId(timelineSlug).subscribe((result: number) => {
			this.timelineId = result;

			this.timelineService.getEras(this.timelineId).subscribe((result: any) => {
				this.eras = result;
			});
		});
	}

	onEraClick(era) {
		this.selectedEra = era;
		this.isAsideOpen = true;
	}

	onEraCloseClick() {
		this.selectedEra = null;
		this.isAsideOpen = false;
	}
}
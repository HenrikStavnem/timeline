import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActor, IEra } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'months-sidebar-page',
	templateUrl: './months-sidebar-page.component.html',
	styleUrls: ['./months-sidebar-page.component.scss']
})
export class MonthsSidebarPageComponent implements OnInit {
	@Input() routeParamId: string;

	months: any[];
	dirtyMonths: any[];
	timelineId: number = null;

	isAsideOpen: boolean = false;
	selectedMonth: number = null;

	isOrderDirty: boolean = false;

	constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private timelineService: TimelineService, private toastService: ToastService, private cd: ChangeDetectorRef) {
		// TODO: This part doesn't work
		
		this.route.params.subscribe(params => {
			console.log('params', params);
		});

		// The above part doesn't work
	}

	ngOnInit(): void {
		let timelineSlug: string = this.routeParamId;

		this.timelineService.getTimelineId(timelineSlug).subscribe((result: number) => {
			this.timelineId = result;

			this.timelineService.getMonths(this.timelineId).subscribe((result: any) => {
				this.months = result;
				this.dirtyMonths = result;
			});
		});
	}

	onMoveUpClick(index) {
		const minValue: number = 0,
			desiredIndex: number = (index) !== minValue ? index - 1 : minValue;

		if (index !== desiredIndex) {
			this.animateSwapPosition(this.dirtyMonths, index, desiredIndex, false);
		}
	}
	
	onMoveDownClick(index) {
		const maxValue: number = this.dirtyMonths.length,
			desiredIndex: number = (index + 1) !== maxValue ? index + 1 : maxValue;

		if (index !== desiredIndex) {
			this.animateSwapPosition(this.dirtyMonths, index, desiredIndex, true);
		}
	}

	onResetClick() {
		this.toastService.updateToast('Reset');

		this.dirtyMonths = this.months;
		this.cd.detectChanges();
	}

	onSaveChangesClick() {
		this.toastService.updateToast('Not implemented yet');

		console.log('dirty months', this.dirtyMonths);

		this.timelineService.updateMonths(this.timelineId, this.dirtyMonths).subscribe((result: any) => {

		});
	}

	// onEraClick(month) {
	// 	this.selectedMonth = month;
	// 	this.isAsideOpen = true;
	// }

	// onEraCloseClick() {
	// 	this.selectedMonth = null;
	// 	this.isAsideOpen = false;
	// }

	private animateSwapPosition(array, item1, item2, isUp: boolean) {
		const duration: number = .25 * 1000;

		if (isUp) {
			array[item1].animateDown = true;
			array[item2].animateUp = true;
		}
		else {
			array[item1].animateUp = true;
			array[item2].animateDown = true;
		}
		
		setTimeout(() => {
			delete(array[item1].animateDown);
			delete(array[item1].animateUp);
			delete(array[item2].animateDown);
			delete(array[item2].animateUp);

			this.swapPosition(array, item1, item2);
			
			// array[item2].justMoved = true;
			
			// setTimeout(() => {
			// 	delete(array[item2].justMoved);

			// 	setTimeout(() => {
			// 		this.swapPosition(array, item1, item2);
			// 	}, 500);
			// }, 1000);

		}, duration);

	}

	private swapPosition(array, item1, item2) {
		let temp = array[item1];

		array[item1] = array[item2];
		array[item2] = temp;

		return array;
	}
}
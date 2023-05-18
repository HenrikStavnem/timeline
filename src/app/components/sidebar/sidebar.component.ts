import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	@Input() routeString: string;
	@Input() routePageType: string;
	@Input() routeParamId: string;

	isAsideOpen: boolean = false;
	isAsideBOpen: boolean = false;

	page: string = "";

	// page specific values
	character: IActor = null;

	name: string;

	constructor(private sidebarService: SidebarService, public route: ActivatedRoute, private router: Router, private toastService: ToastService) {
	}

	ngOnInit(): void {
		this.sidebarService.change.subscribe((eventData: any) => {
			this.isAsideOpen = eventData.isOpen;

			console.log('eventData', eventData);

			if (eventData.pageId) {
				this.page = eventData.pageId;
				this.isAsideBOpen = true;
			}
			else {
				this.page = "";
				this.isAsideBOpen = false;
			}

			if (eventData.character) {
				this.character = eventData.character;
			}
			else {
				this.character = null;
			}
		});

		// this.router.events.subscribe(val => {
		// 	if (val instanceof RoutesRecognized) {
		// 		console.log(val.state.root.firstChild.params);
		// 	}
		// });

		console.log('char', this.character);
	}

	closePage(): void {
		this.isAsideBOpen = false;
		this.page = "";
	}

	closeAside(): void {
		this.isAsideBOpen = false;
		this.page = "";
		this.sidebarService.close();
	}

	onAsideBOpenClick(page: string): void {
		this.page = page;
		this.isAsideBOpen = true;
	}

	onAsideBCloseClick(): void {
		this.isAsideBOpen = false;
	}

	onNotYetImplementedClick(): void {
		this.toastService.updateToast('Not yet implemented');
	}
}

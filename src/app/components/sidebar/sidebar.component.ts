import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	isAsideOpen: boolean = false;
	isAsideBOpen: boolean = false;

	page: string = "";

	constructor(private sidebarService: SidebarService) {
	}

	ngOnInit(): void {
		this.sidebarService.change.subscribe((eventData: any) => {
			this.isAsideOpen = eventData.isOpen;

			console.log('eventData', eventData);

			if (eventData.pageId) {
				this.page = eventData.pageId;
				this.isAsideBOpen = true;
			}
		});
	}

	closeAside() {
		this.sidebarService.close();
	}

	onAsideBOpenClick(page: string) {
		this.page = page;
		this.isAsideBOpen = true;
	}

	onAsideBCloseClick() {
		this.isAsideBOpen = false;
	}
}

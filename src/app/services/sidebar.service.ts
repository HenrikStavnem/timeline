import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	isOpen = false;

	@Output() change: EventEmitter<Object> = new EventEmitter();

	ngInit() {
		this.change.emit({
			isOpen: this.isOpen
		});

		this.setBodySidebarData();
	}

	close() {
		this.isOpen = false;
		this.change.emit({
			isOpen: this.isOpen
		});

		this.setBodySidebarData();
	}

	toggle() {
		this.isOpen = !this.isOpen;
		console.log('service', this.isOpen);
		this.change.emit({
			isOpen: this.isOpen
		});

		this.setBodySidebarData();
	}

	openSidebarPage(pageId: string) {
		if (!pageId) {
			console.error('pageId is empty');
			return;
		}

		this.isOpen = true;

		this.change.emit({
			isOpen: this.isOpen,
			pageId: pageId
		})

		this.setBodySidebarData();
	}

	private setBodySidebarData() {
		document.body.dataset.sidebarIsOpen = this.isOpen.toString();
	}

	constructor() {
		this.change.emit({
			isOpen: this.isOpen
		});
	}
}
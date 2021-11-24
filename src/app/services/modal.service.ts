import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	isOpen = false;

	@Output() change: EventEmitter<Object> = new EventEmitter();

	toggle(modalName: string) {
		this.isOpen = !this.isOpen;
		this.change.emit({
			isOpen: this.isOpen,
			modalName: modalName
		});
	}

	close() {
		this.isOpen = false;
		this.change.emit(this.isOpen);
	}

	constructor() { }
}
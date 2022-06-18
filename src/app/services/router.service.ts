import { Injectable, Output, EventEmitter } from '@angular/core'
import { IActor } from '../interfaces/timeline';

@Injectable({
	providedIn: 'root',
})
export class RouterService {
	//isOpen = false;
	value: string = "initial";

	@Output() change: EventEmitter<Object> = new EventEmitter();

	ngInit() {
		this.change.emit({
			isOpen: this.value
		});
	}

	trigger() {
		this.value = 'triggered';
		this.change.emit({
			value: this.value
		});
	}
}
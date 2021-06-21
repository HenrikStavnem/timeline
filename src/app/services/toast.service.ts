import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToastService {
	toast: string = 'Initial';
	toastChange: Subject<string> = new Subject<string>();

	constructor() {
		this.toastChange.subscribe((value) => {
			this.toast = value;
		});
	}

	updateToast(message: string) {
		this.toastChange.next(message);
	}
}
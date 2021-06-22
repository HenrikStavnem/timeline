import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToast } from 'src/app/interfaces/toast';

@Injectable()
export class ToastService {
	toasts: IToast[] = [];
	toastChange: Subject<string> = new Subject<string>();
	//private index: number = 0;

	constructor() {
		this.toastChange.subscribe((value) => {
			let toast: IToast = {
				body: value,
				state: 'visible'
			},
			index = this.toasts.push(toast) - 1;

			setTimeout(() => {
				this.toasts[index].state = 'fading';
				
				setTimeout(() => {
					this.toasts[index].state = 'shrinking';

					setTimeout(() => {
						this.toasts[index].state = 'hidden';
					}, 1000);
				}, 2000);
			}, 5000);
		});
	}

	updateToast(message: string) {
		this.toastChange.next(message);
	}
}
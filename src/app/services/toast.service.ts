import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToast } from 'src/app/interfaces/toast';

@Injectable()
export class ToastService {
	toasts: IToast[] = [];
	toastChange: Subject<string> = new Subject<string>();

	constructor() {
		let durationShort: number = 1000,
			durationMedium: number = 2000,
			durationLong: number = 5000;

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

						if (this.checkToastsAreHidden()) {
							this.clearToasts();
						}

					}, durationShort);
				}, durationMedium);
			}, durationLong);
		});
	}

	updateToast(message: string) {
		this.toastChange.next(message);
	}

	private checkToastsAreHidden(): boolean {
		let result: boolean = true;

		this.toasts.forEach(toast => {
			if (toast.state !== 'hidden') {
				result = false;
			}
		});

		return result;
	}

	private clearToasts(): void {
		this.toasts = [];
	}
}
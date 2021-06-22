import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IToast } from 'src/app/interfaces/toast';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
	constructor(public toastService: ToastService) {
	}

	ngOnInit(): void {
	}

	get toasts(): IToast[] {
		return this.toastService.toasts;
	}

	onToastClick() {
		this.toastService.updateToast('');
	}

	private getStateClass(state: string) {
		return state;
	}
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

	get toast(): string {
		return this.toastService.toast;
	}

	onToastClick() {
		this.toastService.updateToast('');
	}
}

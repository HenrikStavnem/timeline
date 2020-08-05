import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'window',
	templateUrl: './window.component.html',
	styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
	public windowTitle: string = "Example";

	constructor(private modalService: ModalService) { }

	ngOnInit(): void {
	}

	onClickCloseBtn() {
		this.modalService.close();
	}
}

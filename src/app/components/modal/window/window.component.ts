import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'window',
	templateUrl: './window.component.html',
	styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
	@Input() modalName: string;

	public windowTitle: string = "Create new character"; // TODO: Must be able to set this
	public isAsideOpen: boolean = false;

	constructor(private modalService: ModalService) { }

	ngOnInit(): void {
	}

	onClickCloseBtn(): void {
		this.modalService.close();
	}

	openAside(): void {
		this.isAsideOpen = true;
	}

	closeAside(): void {
		this.isAsideOpen  = false;
	}
}

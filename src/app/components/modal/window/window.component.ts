import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'window',
	templateUrl: './window.component.html',
	styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
	public windowTitle: string = "Create new character";
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

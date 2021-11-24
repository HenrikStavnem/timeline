import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	isModalOpen: boolean = false;
	modalName: string = "";

	constructor(private modalService: ModalService) {}

	ngOnInit(): void {
		this.modalService.change.subscribe(eventData => {
			console.log('isOpen obj', eventData)
			this.isModalOpen = eventData.isOpen;
			this.modalName = eventData.modalName;
		});
	}
}

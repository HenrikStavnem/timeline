import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TimelineService } from '../../services/timeline.service';

@Component({
	selector: 'menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public hasConnection: boolean = false;

	constructor(private timelineService: TimelineService, private modalService: ModalService) {
		interface testInfo {
			statusCode: number
		}

		this.timelineService.testConnection().subscribe((data: testInfo) => {
			switch(data.statusCode) {
				case 200: this.hasConnection = true; break;
				default: this.hasConnection = false; break;
			}
		},
		error => {
			console.log('error: ', error);
			this.hasConnection = false;
		});
	}

	ngOnInit(): void {
	}

	onClickButton() {
		this.modalService.toggle();
	}

}

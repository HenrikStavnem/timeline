import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { SidebarService } from '../../services/sidebar.service';
import { TimelineService } from '../../services/timeline.service';
//import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from '../dialogs/test-dialog/test-dialog.component';

@Component({
	selector: 'menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public hasConnection: boolean = false;

	constructor(private timelineService: TimelineService, private modalService: ModalService, private sidebarService: SidebarService, /*public dialog: MatDialog*/) {
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

	onClickButton(modalName: string) {
		this.modalService.toggle(modalName);
	}

	onOpenDialogClick() {
		//const dialogRef = this.dialog.open(TestDialogComponent);
	}
	
	onCreateEventClick() {
		
	}

	onToggleSidebarClick() {
		this.sidebarService.openSidebarPage('');
		this.sidebarService.toggle();
	}

}

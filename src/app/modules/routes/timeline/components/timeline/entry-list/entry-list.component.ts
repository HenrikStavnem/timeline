import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
//import { Entry } from '../../classes/entry/entry';
//import { Person } from '../../classes/person';
//import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { IActor, IActorName, IActors, IDate, IEntry } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'entry-list',
	templateUrl: './entry-list.component.html',
	styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
	// @Input() item: IEntry;
	// @Input() references: IActors;//Array<Reference>;
	// @Input() locations;
	// @Input() date: IDate;
	// @Input() timelineSlug: string;
	// @Input() isBeingReordered: boolean = false;

	@Input() entries: IEntry[];
	@Input() references: IActors; //Array<Reference>;
	@Input() timelineSlug: string;
	@Input() locations = [];
	@Input() date;

	elements: any[];
	isBeingReordered: boolean = false;

	ngOnInit(): void {
		// this.elements = new Array();

		// this.sidebarService.change.subscribe((eventData: any) => {
		// 	if (eventData.isOpen === false) {
		// 		this.isBeingEdited = false;
		// 	}
		// });


	}

	// constructor(private sidebarService: SidebarService) {
	// }

	onReorderBtnClick() {
		this.isBeingReordered = !this.isBeingReordered;
	}
}

import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EditIcon } from '../icons/Edit.component';
import { Paragraph } from "../paragraph/paragraph.component";

@Component({
	selector: 'Quote',
	imports: [CommonModule, /*CardComponent,*/ Paragraph],
	standalone: true,
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
	@Input() text: string;
	textElements: any[] = [];
	timelineSlug: string = "mirror";

	ngOnInit(): void {
	}

	ngOnChanges() {
		// this.mapDescription();
	}

	constructor() {
	}
}

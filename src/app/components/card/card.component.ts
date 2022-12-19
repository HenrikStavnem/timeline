import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'card',
	imports: [CommonModule, RouterModule],
	standalone: true,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() image?: string;
	@Input() title?: string;
	@Input() subtitle?: string;
	@Input() isBeingEdited?: boolean;
	@Input() canEdit?: boolean;
	@Input() url?: string;
	@Input() shape?: string = 'portrait';
	@Input() onClickCallback? = () => {};

	constructor() {
	}

	ngOnInit(): void {
	}
}

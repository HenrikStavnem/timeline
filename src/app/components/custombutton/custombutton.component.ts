import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { EditIcon } from '../icons/Edit.component';

@Component({
	selector: 'custombutton[text]',
	// imports: [CommonModule, RouterModule],
	imports: [EditIcon],
	standalone: true,
	templateUrl: './custombutton.component.html',
	styleUrls: ['./custombutton.component.scss']
})
export class CustomButton implements OnInit {
	// @Input() image?: string;
	// @Input() title?: string;
	// @Input() subtitle?: string;
	// @Input() isBeingEdited?: boolean;
	// @Input() canEdit?: boolean;
	// @Input() url?: string;
	// @Input() shape?: string = 'portrait';
	@ContentChildren('widget') icon = CardComponent;
	
	@Input() text: string = "";
	@Input() onClickCallback? = () => {};


	constructor() {
	}

	ngOnInit(): void {
	}
}

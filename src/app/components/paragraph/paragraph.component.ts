import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EditIcon } from '../icons/Edit.component';

@Component({
	selector: 'paragraph',
	// imports: [CommonModule, RouterModule],
	imports: [CommonModule, EditIcon, CardComponent],
	standalone: true,
	templateUrl: './paragraph.component.html',
	styleUrls: ['./paragraph.component.scss']
})
export class Paragraph {
	// @ContentChildren('widget') icon = CardComponent;
	
	// @Input() text: string = "";
	// @Input() variation?: string = "solid" || "clear";
	// @Input() onClickCallback? = () => {};

	@Input() textElements: any[]  = [];
}

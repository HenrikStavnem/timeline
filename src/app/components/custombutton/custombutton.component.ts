import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { EditIcon } from '../icons/Edit.component';

@Component({
	selector: 'custombutton[text]',
	// imports: [CommonModule, RouterModule],
	imports: [CommonModule, EditIcon],
	standalone: true,
	templateUrl: './custombutton.component.html',
	styleUrls: ['./custombutton.component.scss']
})
export class CustomButton {
	@ContentChildren('widget') icon = CardComponent;
	
	@Input() text: string = "";
	@Input() variation?: string = "solid" || "clear";
	@Input() onClickCallback? = () => {};
}

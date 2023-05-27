import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'BaseIcon',
	imports: [CommonModule, RouterModule],
	standalone: true,
	template: `<div class="icon"></div>`,
	styles: [
		`
		.icon {
			display: flex;
			align-items: center;
		}
		svg {
			width: 30px;
			height: 30px;
		}`
	]
})
export class BaseIcon {
	@Input() size: any[]  = [];
}

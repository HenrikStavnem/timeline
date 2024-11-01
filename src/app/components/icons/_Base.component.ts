import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'BaseIcon',
	imports: [CommonModule, RouterModule],
	standalone: true,
	template: `<div class="icon"></div>`,
	styleUrl: './_Base.component.scss',
})
export class BaseIcon {
	@Input() size: any[]  = [];
}

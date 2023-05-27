import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'HexagonIcon',
	imports: [CommonModule, RouterModule],
	standalone: true,
	template: `<div class="icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" fill=currentColor xml:space="preserve">
	<path d="M10,2.31l6.66,3.845v7.691L10,17.69l-6.66-3.845V6.155L10,2.31 M10,0L1.34,5v10L10,20l8.66-5V5L10,0L10,0z"/>
	</svg></div>`,
	styles: [
		`
		.icon {
			display: flex;
			align-items: center;
			color: white;
		}
		svg {
			width: 100%;
			height: 100%;
		}`
	]
})
export class HexagonIcon {
}

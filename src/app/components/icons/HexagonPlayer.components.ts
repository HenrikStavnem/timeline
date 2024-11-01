import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseIcon } from './_Base.component';

@Component({
	selector: 'HexagonPlayerIcon',
	imports: [CommonModule, RouterModule],
	standalone: true,
	template: `<div class="icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve" fill=currentColor><path d="M10,2.31l6.66,3.845v7.691L10,17.69l-6.66-3.845V6.155L10,2.31 M10,0L1.34,5v10L10,20l8.66-5V5L10,0L10,0z"/><g><path d="M12.529,9.568c-0.637,0.67-1.532,1.092-2.529,1.092s-1.892-0.422-2.53-1.092C6.58,10.485,6,11.856,6,13.41 c0,2.76,1.791,4.998,4,4.998c2.209,0,4-2.238,4-4.998C14,11.856,13.42,10.485,12.529,9.568z"/><path d="M10,9.66c0.683,0,1.302-0.276,1.754-0.722C12.213,8.484,12.5,7.855,12.5,7.16c0-1.379-1.121-2.5-2.5-2.5 c-1.378,0-2.5,1.121-2.5,2.5c0,0.695,0.287,1.324,0.747,1.778C8.698,9.384,9.317,9.66,10,9.66z"/></g></svg></div>`,
	styleUrl: './_Base.component.scss',
})
export class HexagonPlayerIcon extends BaseIcon {
}

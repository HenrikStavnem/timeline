import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'Headline',
  standalone: true,
  imports: [NgIf],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
	@Input() text: string;
	@Input() size?: 'h1' | 'h2' | 'h3' = 'h2';
}

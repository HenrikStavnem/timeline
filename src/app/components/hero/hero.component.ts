import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'Hero',
  standalone: true,
  imports: [NgIf, NgForOf, RouterModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
	@Input() title: string;
	@Input() byLine?: string;
	@Input() description?: string;
	@Input() bgImage?: string = 'https://cdna.artstation.com/p/assets/images/images/080/288/650/large/artem-chebokha-410-falling-sparks-1440.jpg?1727190214';
	@Input() links?: {url: string, title: string}[];
}

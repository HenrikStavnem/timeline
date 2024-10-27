import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomButton } from '../custombutton/custombutton.component';
import { HexagonPlayerIcon } from '../icons/HexagonPlayer.components';
import { HexagonIcon } from '../icons/Hexagon.components';

@Component({
	standalone: true,
	selector: 'card',
	imports: [CommonModule, RouterModule, CustomButton, HexagonIcon, HexagonPlayerIcon],
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
	@Input() shape?: 'portrait' | 'landscape' = 'portrait';
	@Input() isRpg?: boolean;
	@Input() isPlayable?: boolean;
	@Input() onClickCallback? = () => {};

	constructor() {
	}

	ngOnInit(): void {
	}

	onImageError(): void {
		this.image = "https://tokens.dukendor.com/graphics/avatars/visitor.png";
		this.image = "/assets/images/image-fails.png";
	}
}

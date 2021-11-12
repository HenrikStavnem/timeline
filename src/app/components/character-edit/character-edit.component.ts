import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IActorGenderCard, IActorName, IActorNameCard } from 'src/app/interfaces/timeline';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'character-edit',
	templateUrl: './character-edit.component.html',
	styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
	isAsideOpen: boolean = false;
	openAsideId: string = "";
	names: IActorNameCard[] = [];
	genders: IActorGenderCard[] = [];

	ngOnInit(): void {
	}

	constructor(public toastService: ToastService) {
	}

	onSaveCharacterClick() {
		this.toastService.updateToast('Save character is not yet implemented');
	}

	setNames = (names: IActorNameCard[]) => {
		this.names = names;
	}

	// TODO: Refactor so these can be reused in all dialogs with asides
	openAside(id: string): void {
		this.openAsideId = id;
		this.isAsideOpen = true;
	}

	closeAside = (): void => {
		this.isAsideOpen  = false;
	}
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActor, IEra } from 'src/app/interfaces/timeline';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'character-sidebar-page',
	templateUrl: './character-sidebar-page.component.html',
	styleUrls: ['./character-sidebar-page.component.scss']
})
export class CharacterSidebarPageComponent implements OnInit {
	@Input() existingCharacter: IActor = null;
	@Input() routePageType: string;
	@Input() routeParamId: string;

	firstName: string = "";
	lastName: string = "";

	isAsideOpen: boolean = false;
	isAsideBOpen: boolean = false;

	timelineId: number = 1; // TODO: Change to reflect actual current timeline, if any

	page: string = "";

	eras: IEra[];

	portraitImage: string = "https://tokens.dukendor.com/graphics/avatars/visitor.png";
	coverImage: string;
	
	form: UntypedFormGroup = new UntypedFormGroup({
		Firstname: new UntypedFormControl('', [
			Validators.required,
			Validators.minLength(1)
		]),
		Lastname: new UntypedFormControl('', [
			Validators.required,
			Validators.minLength(1)
		]),
		Era: new UntypedFormControl('', [
		]),
		Description: new UntypedFormControl('', [
		]),
		ImageUrl: new UntypedFormControl('', []),
		CoverImageUrl: new UntypedFormControl('', []),
		Url: new UntypedFormControl('', [
			Validators.required,
			Validators.minLength(1)
		]),
	});

	constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private timelineService: TimelineService, private toastService: ToastService) {
		// TODO: This part doesn't work
		
		this.route.params.subscribe(params => {
			console.log('params', params);
		});

		// The above part doesn't work
	}

	ngOnInit(): void {
		this.getTimelineData();

		console.log('character is', this.existingCharacter);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('changes', changes);
		if (this.existingCharacter) {
			this.setFormData();
		}

		this.getTimelineData();
	}

	getTimelineData() {
		if (!this.routePageType || !this.routeParamId) {
			return;
		}

		let timelineSlug = this.routeParamId; //this.route.snapshot.params.id;

		console.log('timelineSlug', timelineSlug);

		this.timelineService.getTimelineId(timelineSlug).subscribe((result: number) => {
			this.timelineId = result;

			console.log('timelineId', this.timelineId, timelineSlug);

			this.timelineService.getEventInputDate(this.timelineId).subscribe((result: any) => {
				// this.types = result.types;
				this.eras = result.eras;
				// this.months = result.months;
				// this.characters = result.characters;
				// this.seasons = result.seasons;
			});
		});
	}

	setFormData(): void {
		console.log('character data', this.existingCharacter);

		this.form.get('Firstname').setValue(this.existingCharacter.firstName);
		this.form.get('Lastname').setValue(this.existingCharacter.lastName);
		this.form.get('Description').setValue(this.existingCharacter.description);
		this.form.get('CoverImageUrl').setValue(this.existingCharacter.coverImage);
		this.form.get('ImageUrl').setValue(this.existingCharacter.image);
		this.form.get('Url').setValue(this.existingCharacter.slug);

		this.setImage();
		this.setCoverImage();

		this.firstName = this.form.get('Firstname').value;
		this.lastName = this.form.get('Lastname').value;
		
	}

	setImageClick(): void {
		this.setImage();
	}

	setCoverImageClick(): void {
		this.setCoverImage();
	}

	setImage(): void {
		this.portraitImage = this.form.get('ImageUrl').value;
	}

	setCoverImage(): void {
		this.coverImage = this.form.get('CoverImageUrl').value;
	}
	

	saveCharacterClick(): void {
		let firstName: string = this.form.get('Firstname').value,
			lastName: string = this.form.get('Lastname').value,
			description: string = this.form.get('Description').value,
			imageUrl: string = this.form.get('ImageUrl').value,
			coverImageUrl: string = this.form.get('CoverImageUrl').value,
			era: number = this.form.get('Era').value,
			slug: string = this.form.get('Url').value;

		this.timelineService.createCharacter(this.timelineId, firstName, lastName, description, imageUrl, coverImageUrl, slug).subscribe((result: any) => {
			this.toastService.updateToast('Character saved');
		});
	}

	saveCharacterChangesClick(): void {
		let firstName: string = this.form.get('Firstname').value,
			lastName: string = this.form.get('Lastname').value,
			description: string = this.form.get('Description').value,
			imageUrl: string = this.form.get('ImageUrl').value,
			coverImageUrl: string = this.form.get('CoverImageUrl').value,
			era: number = this.form.get('Era').value,
			slug: string = this.form.get('Url').value;

		this.timelineService.updateCharacter(this.existingCharacter.id, firstName, lastName, description, imageUrl, coverImageUrl, slug).subscribe((result: any) => {
			this.toastService.updateToast('Changes saved');

			this.timelineService.getCharactersByTimeline(this.routeParamId, '').lift;
		});
	}

	onFirstNameKeyup() {
		this.firstName = this.form.get('Firstname').value;
		this.updateSlugSuggestion();
	}

	onLastNameKeyup() {
		this.lastName = this.form.get('Lastname').value;
		this.updateSlugSuggestion();
	}

	updateSlugSuggestion() {
		const currentSlug: string = this.existingCharacter?.slug;

		if (!currentSlug || currentSlug === "") {
			const firstName: string = this.form.get('Firstname').value,
				lastName: string = this.form.get('Lastname').value;

			let suggestion: string = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
			if (suggestion.charAt(suggestion.length - 1) === '-') {
				suggestion = suggestion.slice(0, suggestion.length - 1);
			}

			this.form.get('Url').setValue(suggestion);
		}
	}
}
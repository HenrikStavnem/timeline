import { Target } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IActor, IEra, IMonth, ITimeline } from 'src/app/interfaces/timeline';
import { ITimelineCard, ITimelineCards } from 'src/app/interfaces/timelinecard';
import { TimelineService } from 'src/app/services/timeline.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	@ViewChild('descriptionEditor') descriptionEditor: ElementRef;
	@ViewChild('mentionsDropdown') mentionsDropdown: ElementRef;

	form: FormGroup;
	mentionForm: FormGroup;
	editMentionForm: FormGroup;
	editMentionTarget: HTMLInputElement = null;
	timelineCards: ITimelineCard[];		// TODO: Only for tempoary use
	types: any;				// TODO: Convert to correct type
	exactnessTypes: string[];
	eras: IEra[];
	months: IMonth[];
	characters: IActor[];
	timelineId: number = 9;
	showMentions: boolean = false;
	showMentionEditor: boolean = false;
	textfieldRange: Range = null;
	atSymbolRange: Range = null;

	constructor(
		private timelineService: TimelineService,
		public toastService: ToastService
	) { }

	ngOnInit(): void {
		this.timelineService.getTimelines().subscribe((timelines: ITimelineCards) => {
			this.timelineCards = timelines.timelines;
		},
		error => {
			console.error('api error: ', error);
		});
		/*
		this.timelineService.getTimelines().subscribe( (timelines: ITimelineCards) => {
			this.timelines = timelines.timelines ;
		});
		*/

		this.timelineService.getMonths(this.timelineId).subscribe((result:any) => {
			console.log(result);
			this.types = result.types;
			this.eras = result.eras;
			this.months = result.months;
			this.characters = result.characters;
		});

		this.form = new FormGroup({
			Timeline: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			]),
			Type: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			]),
			Exactness: new FormControl('', [

			]),
			Era: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			]),
			Year: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			]),
			Month: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			]),
			Day: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			])
		});

		this.mentionForm = new FormGroup({
			Mention: new FormControl('', [
			]),
			MentionQuery: new FormControl('', [
			])
		});

		this.editMentionForm = new FormGroup({
			//Mention: new FormControl('', [
			//])
			override: new FormControl('', []),
			showAge: new FormControl('', [])
		});

		// TODO: Below is just for show. Must be aligned with yearExactness and MonthExactness, etc.
		this.exactnessTypes = [
			'millenia',
			'century',
			'decade',
			'season',
			'beforeYear',
			'year',
			'afterYear',
			'beforeMonth',
			'month',
			'afterMonth',
			'relative',
			'beforeDay',
			'day',
			'afterDay',
			'unknown'
		];
	}

	/**
	 * Function to test toast and description markup
	 * @returns void
	 */
	testBtnClick(): void {
		//console.log("createEventBtnClick");
		let el: ElementRef = this.descriptionEditor,
			description: string = this.encodeHtmlToDbString(el);

		console.log(description);
		this.toastService.updateToast('Check console');
	}

	/**
	 * CreateEventBtnClick
	 */
	createEventBtnClick(): void {
		//console.log("createEventBtnClick");
		let el: ElementRef = this.descriptionEditor,
			description: string = this.encodeHtmlToDbString(el);

		if (this.form.valid && description !== '') {

			let era = this.form.get('Era').value,
				exactness = this.form.get('Exactness').value,
				year = this.form.get('Year').value,
				month = this.form.get('Month').value,
				day = this.form.get('Day').value,
				type = this.form.get('Type').value;

	
			this.timelineService.createEvent(era, exactness, year, month, day, type, description).subscribe((message: string) => {
				console.log("Message", message);
				this.toastService.updateToast('Event saved');
			},
			error => {
				this.toastService.updateToast('Error. See console');
				console.error('api error: ', error);
			});
		}
		else {
			this.toastService.updateToast('Please fill out every field');
			//alert("Please fill out every field.");
		}
	}

	onMentionSettingsCancelClick(): void {
		this.closeMentions();
	}

	onMentionSettingsSaveClick(): void {
		let el = this.editMentionTarget,
		overrideName: string = this.editMentionForm.get('override').value;
		
		el.dataset.override = overrideName;
		el.value = overrideName;

		this.showMentionEditor = false;
		//this.toastService.updateToast('Override not saved');
		
		this.editMentionTarget = null;
	}

	onMentionInput(event: InputEvent): void {
		let value = this.mentionForm.get('MentionQuery').value;

		this.timelineService.getCharacters(this.timelineId, value).subscribe((message: any) => {
			//console.log('reply', this.timelineId, message);
			if (message?.characters) {
				this.characters = message.characters;
				if (this.characters.length > 0) {
					this.selectFirstMention();
				}
			}
		});
	}

	private selectFirstMention(): void {
		let form = this.mentionForm.get('Mention');		
		if (this.characters[0]) {
			form.setValue(this.characters[0].id);
		}
	}

	onDescriptionChange(event: InputEvent): void {
		let dropdown = this.mentionsDropdown.nativeElement,
			form = dropdown.querySelector('form');

		this.saveSelectionRange();
		console.log("event", InputEvent);

		if (event.data==="@") {
			let range: Range = this.textfieldRange,
				editor = this.descriptionEditor;
			console.log("Trigger mention functionality");
			this.showMentions = true;
			this.atSymbolRange = range;
			dropdown.style.top = 0 - editor.nativeElement.height - range.getBoundingClientRect().height - 50 + 'px';
			dropdown.style.left = range.getBoundingClientRect().left + 'px';
			
			this.mentionForm.get('MentionQuery').setValue('');
			this.characters = [];
			
			// Below is an ugly hack to force focus on dropdown
			setTimeout(() => {
				form.children[0].focus();
			}, 20);

		}
		else {
			this.closeMentions();
		}
	}

	onMentionCloseClick() {
		this.closeMentions();
	}

	private closeMentions() {
		this.showMentions = false;
		// TODO: Set text cursor back to where it was before opening the mention dialog
	}

	getDescriptionValue(): string {
		let el: ElementRef = this.descriptionEditor;
		console.log('innerHtml', el.nativeElement.innerHTML);
		console.log('encoded', this.encodeHtmlToDbString(el));
		return this.encodeHtmlToDbString(el);
	}

	private encodeHtmlToDbString(el: ElementRef): string {
		let result: string,
			nodes: NodeListOf<ChildNode|HTMLElement> = el.nativeElement.childNodes;

		result = "";

		//console.log(nodes);

		nodes.forEach(node => {
			if (node.nodeType === 1) { // Is an element
				let thisNode: any = node, // TODO Set to correct type
					dataset = thisNode.dataset,
					settingsString: string = '';

				if (dataset.override !== '' && dataset.override !== undefined) {
					settingsString = settingsString + `name:${dataset.override}`;
				}

				result = result + `{char-${dataset.actorId}${settingsString !== '' ? '|' + settingsString : ''}}`;
			}
			if (node.nodeType === 3) { // Pure text
				result = result + node.textContent;
			}
		});

		return result;
	}

	private findCharacterById(id: number) {
		const key = Object.keys(this.characters).find(character => this.characters[character].id === id);
		return this.characters[key];
	}

	onMentionClick(target) {
		this.editMentionTarget = target;
		this.showMentionEditor = !this.showMentionEditor;
	}

	onAddMention() {
		let value = this.mentionForm.get('Mention').value;
		this.insert(value);
	}

	insert(id: number) {
		let el: ElementRef = this.descriptionEditor,
			newEl: HTMLDivElement = document.createElement("div"),
			character = this.findCharacterById(id),
			sel: Selection = window.getSelection();

		newEl.innerHTML = `<input type="button" class="mention" data-type="character" data-actor-id="${character.id}" value="${character.firstName}${character.lastName ? " " + character.lastName : ""}"/>`;
		
		// TODO: support of single and double quotes in character names

		el.nativeElement.focus(); // force focus on custom textfield component

		let range: Range = this.textfieldRange;
		range.deleteContents();

		var fragment: DocumentFragment = document.createDocumentFragment(),
			node: ChildNode,
			lastNode: ChildNode;

		while ( (node = newEl.firstChild) ) {
			node.addEventListener('click', (e) => {
				this.onMentionClick(e.currentTarget);
			});
			lastNode = fragment.appendChild(node);
		}

		// Below is to add an extra space after input
		/*
		let extraSpace = document.createTextNode("\u00A0");
		fragment.appendChild(extraSpace);
		*/
		range.insertNode(fragment);
		range.setStartAfter(lastNode);
		range.setEndAfter(lastNode);
		sel.removeAllRanges();
		sel.addRange(range);
		
		/*
		if (lastNode) {
			range = range.cloneRange();
			range.setStartAfter(lastNode);

			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
		*/

		// Cannot use the following, as it breaks click events on mentions
		//el.nativeElement.innerHTML = el.nativeElement.innerHTML.replaceAll('@','');

		//close mentions popup
		this.showMentions = false;

		this.cleanUpText(el);
	}

	cleanUpText(el: ElementRef): void {
		let nodes: NodeList = el.nativeElement.childNodes;

		if (nodes.length) {
			nodes.forEach(node => {
				if (node.nodeType === Node.TEXT_NODE) {
					node.nodeValue = node.nodeValue.replace(/@/g, '');
				}
			});
		}
	}

	onKeyUp(event: KeyboardEvent) {
		console.log("Key down $event:", event);

		let el: ElementRef = this.descriptionEditor, //document.querySelector("#custom"),
			selection = window.getSelection(),
			range = selection.getRangeAt(0),
			rangeParentElement = range.startContainer.parentElement,
			elementIsMention = rangeParentElement.classList.contains('mention');
	}

	onMentionFormKeyUp(event: KeyboardEvent) {
		// TODO: Buggy. Doesn't add focus
		let target: HTMLElement = event.target as HTMLElement;
		if (target) {
			target.parentNode.querySelector("input").focus()
		}
	}

	onMentionKeyDown(event: KeyboardEvent): void {
		if (event.key === "Escape") {
			this.closeMentions();
		}
	}

	onBlur() {
		console.log("blurred");
		this.saveSelectionRange();
	}

	private saveSelectionRange(): void {
		let selection: Selection = window.getSelection(),
			range: Range = selection.getRangeAt(0);

			this.textfieldRange = range;
	}

	private getCaretCharacterOffset(element: Element): number {
		let caretOffset: number = 0,
			document: any = element.ownerDocument,
			window: Window = document.defaultView,
			selection: any;

		if (typeof window.getSelection() != "undefined") {
			selection = window.getSelection();

			if (selection.rangeCount > 0) {
				let range: Range = window.getSelection().getRangeAt(0),
					preCaretRange: Range = range.cloneRange();
			
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				caretOffset = preCaretRange.toString().length;
			}
		}
		else if ( (selection = document.selection) && selection.type !== "Control") {
			let textRange = selection.createRange(),
				preCaretTextRange = document.body.createTextRange();

				preCaretTextRange.moveToElementText(element);
				preCaretTextRange.setEndPoint("EndToEnd", textRange);
				caretOffset = preCaretTextRange.text.length;
		}

		return caretOffset;
	}

}

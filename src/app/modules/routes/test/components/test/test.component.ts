import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IActor, IEra, IMonth } from 'src/app/interfaces/timeline';
import { TimelineService } from 'src/app/services/timeline.service';

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
	types: any;				// TODO: Convert to correct type
	eras: IEra[];
	months: IMonth[];
	characters: IActor[];
	timelineId: number = 10;
	showMentions: boolean = false;
	showMentionEditor: boolean = false;
	textfieldRange: Range = null;

	constructor(
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {
		this.timelineService.getMonths(this.timelineId).subscribe((result:any) => {
			console.log(result);
			this.types = result.types;
			this.eras = result.eras;
			this.months = result.months;
			this.characters = result.characters;
		});

		this.form = new FormGroup({
			Description: new FormControl('', [
			]),
			Type: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
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
			])
		});
	}

	createEventBtnClick() {
		console.log("createEventBtnClick");
		let el: ElementRef = this.descriptionEditor,
			description: string = this.encodeHtmlToDbString(el);

		if (this.form.valid && description !== '') {

			let era = this.form.get('Era').value,
				year = this.form.get('Year').value,
				month = this.form.get('Month').value,
				day = this.form.get('Day').value,
				type = this.form.get('Type').value;

			let inputObj = {
				description: description,
				year: 1993,
				month: month
			};
	
			this.timelineService.createEvent(era, year, month, day, type, description).subscribe((message: string) => {
				console.log("Message", message);
			},
			error => {
				console.error('api error: ', error);
			});
		}
		else {
			alert("Please fill out every field.");
		}
	}

	onDescriptionChange(event: InputEvent) {
		this.saveSelectionRange();
		console.log("event", InputEvent);

		if (event.data==="@") {
			let range: Range = this.textfieldRange,
				editor = this.descriptionEditor;
			console.log("Trigger mention functionality");
			this.showMentions = true;
			this.mentionsDropdown.nativeElement.style.top = 0 - editor.nativeElement.height - range.getBoundingClientRect().height - 50 + 'px';
			this.mentionsDropdown.nativeElement.style.left = range.getBoundingClientRect().left + 'px';
		}
		else {
			this.showMentions = false;
		}
	}

	getDescriptionValue(): string {
		let el: ElementRef = this.descriptionEditor; //document.querySelector("#custom");
		console.log('innerHtml', el.nativeElement.innerHTML);
		console.log('encoded', this.encodeHtmlToDbString(el));
		return this.encodeHtmlToDbString(el);
	}

	private encodeHtmlToDbString(el: ElementRef): string {
		let result: string,
			nodes: NodeListOf<ChildNode|HTMLElement> = el.nativeElement.childNodes;

		result = "";

		console.log(nodes);

		nodes.forEach(node => {
			if (node.nodeType === 1) { // Is an element
				let thisNode: any = node, // TODO Set to correct type
					dataset = thisNode.dataset;
				
				result = result + "{char-"+dataset.actorId+"}";
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

	onMentionClick(event: Event) {
		let target = event.currentTarget;
		this.showMentionEditor = !this.showMentionEditor;
		console.log("Mention clicked");
	}

	onAddMention() {
		let value = this.mentionForm.get('Mention').value;
		this.insert(value);
	}

	insert(id: number) {
		let el: ElementRef = this.descriptionEditor,
			newEl: HTMLDivElement = document.createElement("div"),
			character = this.findCharacterById(id);

		//newEl.innerHTML = `<input type="button" class="mention" data-type="character" data-actor-id="${character.id}" value="${character.firstName} ${character.lastName}" onClick="console.log('CLICK', event.currentTarget);"/>`;

		newEl.innerHTML = `<input type="button" class="mention" data-type="character" data-actor-id="${character.id}" value="${character.firstName}${character.lastName ? " " + character.lastName : ""}"/>`;
		
		// TODO: initial '@' must be removed on successful mention insertion
		// TODO: support of single and double quotes in character names

		el.nativeElement.focus(); // force focus on custom textfield component

		let range: Range = this.textfieldRange;		
		range.deleteContents();

		var fragment: DocumentFragment = document.createDocumentFragment(),
			node: ChildNode,
			lastNode: ChildNode;

		while ( (node = newEl.firstChild) ) {
			node.addEventListener('click', (e) => {
				this.onMentionClick(e);
			});
			lastNode = fragment.appendChild(node);
		}

		// Below is to add an extra space after input
		/*
		let extraSpace = document.createTextNode("\u00A0");
		fragment.appendChild(extraSpace);
		*/
		range.insertNode(fragment);

		//close mentions popup
		this.showMentions = false;
	}

	onKeyUp(event: KeyboardEvent) {
		//console.log("Key down $event:", event);

		let el: ElementRef = this.descriptionEditor, //document.querySelector("#custom"),
			selection = window.getSelection(),
			range = selection.getRangeAt(0),
			rangeParentElement = range.startContainer.parentElement,
			elementIsMention = rangeParentElement.classList.contains('mention');

		//TODO: getting the right container is off, but it's the right approach

		//let caretPosition = this.getCaretCharacterOffset(el);

		//console.log(caretPosition);

		/*
		if (event.key === "ArrowRight") {
			if (elementIsMention) {
				console.log("Element is a mention. Do skip.", rangeParentElement);
				debugger;
			}
		}

		if (event.key === "ArrowLeft") {
			if (elementIsMention) {
				console.log("Element is a mention. Do skip.", el);

				let newCaretPosition: number = caretPosition - rangeParentElement.innerHTML.length;
				console.log(newCaretPosition);

				let newRange: Range;
				
				selection.empty();
				selection.addRange(newRange);

				//
				for (let i = 0; i < el.children.length; i++) {
					if (el.children[i] === rangeParentElement) {
						//debugger;
					}
				}
				//
			}
		}
		*/
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

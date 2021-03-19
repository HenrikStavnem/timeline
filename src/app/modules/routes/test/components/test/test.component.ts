import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	form: FormGroup;
	types: any;		// TODO: Convert to correct type
	eras: any;		// TODO: Convert to correct type
	months: any;	// TODO: Convert to correct type
	characters: any;// TODO: Convert to correct type
	timelineId: number = 10;
	showMentions: boolean = false;
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
	}

	createEventBtnClick() {
		console.log("createEventBtnClick");

		if (this.form.valid) {

			let era = this.form.get('Era').value,
				year = this.form.get('Year').value,
				month = this.form.get('Month').value,
				day = this.form.get('Day').value,
				type = this.form.get('Type').value,
				description = this.form.get('Description').value;

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
		if (event.data==="@") {
			console.log("Trigger mention functionality");
			this.showMentions = true;
		}
		else {
			this.showMentions = false;
		}
	}

	test() {
		let el = document.querySelector("#custom");
		console.log('innerHtml', el.innerHTML);

	}

	private findCharacterById(id: number) {
		const key = Object.keys(this.characters).find(character => this.characters[character].id === id);
		return this.characters[key];
	}

	onMentionClick() {
		console.log("Mention clicked");
	}

	insert(id: number) {
		let el: HTMLElement = document.querySelector("#custom"),
			newEl: HTMLDivElement = document.createElement("div"),
			character = this.findCharacterById(id);

		newEl.innerHTML = `<input type="button" class="mention" data-type="character" data-actor-id="${character.id}" value="${character.firstName} ${character.lastName}" onClick="console.log('CLICK');"/>`;
		
		// TODO: mention element onClick must be bound with onMentionClick() component function
		// TODO: initial '@' must be removed on successful mention insertion


		el.focus(); // force focus on custom textfield component

		let range: Range = this.textfieldRange;
		
		
		range.deleteContents();

		var fragment: DocumentFragment = document.createDocumentFragment(),
			node: ChildNode,
			lastNode: ChildNode;

		while ( (node = newEl.firstChild) ) {
			lastNode = fragment.appendChild(node);
		}

		// Below is to add an extra space after input
		/*
		let extraSpace = document.createTextNode("\u00A0");
		fragment.appendChild(extraSpace);
		*/

		console.log("fragment", fragment);

		var firstNode: ChildNode = fragment.firstChild;
		range.insertNode(fragment);

		console.log("range", range);

		//close mentions popup
		this.showMentions = false;
	}

	onKeyUp(event: KeyboardEvent) {
		//console.log("Key down $event:", event);

		let el = document.querySelector("#custom"),
			selection = window.getSelection(),
			range = selection.getRangeAt(0),
			rangeParentElement = range.startContainer.parentElement,
			elementIsMention = rangeParentElement.classList.contains('mention');

		//TODO: getting the right container is off, but it's the right approach

		let caretPosition = this.getCaretCharacterOffset(el);

		console.log(caretPosition);

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

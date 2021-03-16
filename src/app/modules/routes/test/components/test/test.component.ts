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

	insert(str: string) {
		let el: HTMLElement = document.querySelector("#custom");
		let newEl: HTMLDivElement = document.createElement("div");
		newEl.innerHTML = `<div class='mention'>${str}</div>`;

		el.focus(); // force focus on custom textfield component

		/*
		let selection = window.getSelection(),
			range = selection.getRangeAt(0);
		*/

		let range: Range = this.textfieldRange;
		
		//console.log("selection", selection);
		
		range.deleteContents();

		var fragment: DocumentFragment = document.createDocumentFragment(),
			node: ChildNode,
			lastNode: ChildNode;

		while ( (node = newEl.firstChild) ) {
			lastNode = fragment.appendChild(node);
		}

		// space
		let testEl = document.createTextNode("--");

		fragment.appendChild(testEl);

		console.log("fragment", fragment);

		var firstNode: ChildNode = fragment.firstChild;
		range.insertNode(fragment);

		console.log("range", range);

		//close mentions popup
		this.showMentions = false;
	}

	onKeyDown(event: Event) {
		//console.log("Key down $event:", event);

		let selection = window.getSelection(),
			range = selection.getRangeAt(0),
			rangeParentElement = range.startContainer.parentElement,
			elementIsMention = rangeParentElement.classList.contains('mention');

		//TODO: getting the right container is off, but it's the right approach.

		if (elementIsMention) {
			console.log("Element is a mention. Do skip.");
		}

		/*
		if (event.key === "ArrowRight") {
			console.log("Right");
		}

		if (event.key === "ArrowLeft") {
			console.log("Left");
		}
		*/
	}

	onBlur() {
		console.log("blurred");
		this.saveSelectionRange();
	}

	private saveSelectionRange(): void {
		let selection = window.getSelection(),
			range = selection.getRangeAt(0);

			this.textfieldRange = range;
	}

}

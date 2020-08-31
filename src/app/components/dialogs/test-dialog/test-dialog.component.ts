import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-test-dialog',
	templateUrl: './test-dialog.component.html',
	styleUrls: ['./test-dialog.component.scss'],
})
export class TestDialogComponent implements OnInit {
	testFormControl = new FormControl('');

	constructor() { }

	ngOnInit(): void {
	}

	onSaveClick(): void {
		let value = this.testFormControl.value;
		alert("value is " + value);
	}

}

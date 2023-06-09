;import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomButton } from '../custombutton/custombutton.component';
import { HexagonPlayerIcon } from '../icons/HexagonPlayer.components';
import { HexagonIcon } from '../icons/Hexagon.components';

@Component({
	selector: 'dateinput',
	imports: [CommonModule, RouterModule, CustomButton, HexagonIcon, HexagonPlayerIcon],
	standalone: true,
	templateUrl: './dateinput.component.html',
	styleUrls: ['./dateinput.component.scss']
})
export class DateInputComponent implements OnInit {
	@Input() eras: any[];
	@Input() months: any[];
	@Input({required: true}) title?: string;
	
	@Output() newDateEvent = new EventEmitter<string>();

	exactnessTypes: string[];

	showYearInput = false;
	showMonthInput = false;
	showDayInput = false;

	date: any = {
		era: null,
		year: null,
		month: null,
		day: null
	}

	constructor() {
		// TODO: Below is just for show. Must be aligned with yearExactness and MonthExactness, etc.
		this.exactnessTypes = [
			'unknown-before',
			'millenia',
			'century',
			'decade',
			'season',
			'beforeYear',
			'year',
			'yearCirca',
			'afterYear',
			'beforeMonth',
			'month',
			'afterMonth',
			// 'relative',
			'beforeDay',
			'day',
			'afterDay',
			'unknown-after'
		];
	}

	ngOnInit(): void {
	}

	onExactnessChange(e: Event): void {
		const target = e.target as HTMLInputElement,
			value = target.value;

		console.log('exactness:', value);

		this.showYearInput = false;
		this.showMonthInput = false;
		this.showDayInput = false;

		if (['beforeYear', 'yearCirca', 'year', 'afterYear', 'beforeMonth', 'month', 'afterMonth', 'beforeDay', 'day', 'afterDay'].includes(value)) {
			this.showYearInput = true;
		}
		if (['beforeMonth' , 'month', 'afterMonth', 'beforeDay', 'day', 'afterDay'].includes(value)) {
			this.showMonthInput = true;
		}
		if (['beforeDay', 'day', 'afterDay'].includes(value)) {
			this.showDayInput = true;
		}
	}

	onValueChange(field: string, e: Event): void {
		const target = e.target as HTMLInputElement,
			value = target.value; 

		switch(field) {
			case 'era': this.date.era = value; break;
			case 'year': this.date.year = value; break;
			case 'month': this.date.month = value; break;
			case 'day': this.date.day = value; break;
		}

		this.newDateEvent.emit(this.date);
	}
}

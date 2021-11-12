import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'aside-component',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
	public isAsideOpen: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	openAside(): void {
		this.isAsideOpen = true;
	}

	closeAside(): void {
		this.isAsideOpen  = false;
	}
}

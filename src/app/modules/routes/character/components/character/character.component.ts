import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/interfaces/timeline';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
	character: IActor;

	constructor(
		private route: ActivatedRoute,
		private timelineService: TimelineService
	) { }

	ngOnInit(): void {
		let characterSlug: string;
		this.route.paramMap.subscribe(params => {
			console.log('params', params, params.get('id2'));
			characterSlug = params.get('id2');
		});

		
		this.timelineService.getCharacter(characterSlug).subscribe((character: any) => {
			this.character = character.character;
			console.log("this character", this.character);
		},
		error => {
			console.error('api error: ', error);
		});
	}

	getModifier(value: number): number {
		return Math.floor((value - 10) / 2);
	}

}

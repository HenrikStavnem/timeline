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
		let slug: string;
		this.route.paramMap.subscribe(params => {
			slug = params.get('id');
		});

		
		this.timelineService.getCharacter(slug).subscribe((character: any) => {
			this.character = character.character;
			console.log(this.character);
		},
		error => {
			console.error('api error: ', error);
		});
	}

}

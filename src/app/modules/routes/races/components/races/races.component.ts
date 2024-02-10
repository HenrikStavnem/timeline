import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'players',
	templateUrl: './races.component.html',
	styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

	playerCards: any[];
	image: string;
	coverImage: string;

	// races: [{
	// 	title: string;
	// 	image: string;
	// }];

	races: any[]; // TODO: Fix!

	constructor(
		// private route: ActivatedRoute,
		// private sidebarService: SidebarService,
		// private timelineService: TimelineService,
		public translate: TranslateService
	) { }

	ngOnInit(): void {

		this.coverImage = 'https://cdna.artstation.com/p/assets/images/images/004/239/228/large/andreas-rocha-themasterreturns02.jpg?1481638001';

		this.races = [
			{
				title: 'Dwarves',
				image: 'https://cdna.artstation.com/p/assets/images/images/056/702/688/4k/miro-petrov-magnus-anvil-the-keeper-of-the-gemstones.jpg?1669891151'
			},
			{
				title: 'Elves',
				image: 'https://cdna.artstation.com/p/assets/images/images/010/517/558/large/magnus-noren-elf-noble1.jpg?1524832368'
			},
			{
				title: 'Firbolg',
				image: 'https://cdnb.artstation.com/p/assets/images/images/054/094/089/large/ivana-abbate-ritratto-filborg-artstation.jpg?1663751340'
			},
			{
				title: 'Goblins',
				image: 'https://cdna.artstation.com/p/assets/images/images/040/127/204/large/brian-valeza-23-reckless-ringleader.jpg?1627944442'
			},
			{
				title: 'Halflings',
				image: 'https://cdnb.artstation.com/p/assets/images/images/056/954/527/large/tooth-wu-1.jpg?1670477027'
			},
			{
				title: 'Humans',
				image: 'https://cdnb.artstation.com/p/assets/images/images/008/819/135/large/terry-wei-2.jpg?1515508022'
			},
			{
				title: 'Owlin',
				image: 'https://image.tensorartassets.com/posts/images/640252201016501637/7373aba3-8367-4a5e-9973-9820eced8bbc.jpg'
			},
			// {
			// 	title: 'Shoredwellers',
			// 	image: 'https://cdna.artstation.com/p/assets/images/images/062/661/272/4k/francisque-facon-fishmouther-beautyshot-01-copy-2.jpg?1683659545'
			// }
		]
		console.log(this.races);
		// this.timelineService.getPlayers().subscribe((result: any) => {
		// 	this.playerCards = result;
		// 	console.table(result);
		// });
	}
}

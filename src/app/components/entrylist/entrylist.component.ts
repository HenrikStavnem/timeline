import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';

import { Entry } from '../../classes/entry/entry';
import { TimelineService } from '../../services/timeline.service';
import { Timeline } from '../../classes/timeline';
import { Reference } from '../../reference';

@Component({
	selector: 'entrylist',
	templateUrl: './entrylist.component.html',
	styleUrls: ['./entrylist.component.scss'],
	providers: [TimelineService]
})

export class EntrylistComponent implements OnInit {

	show: boolean = true;

	public title: string;
	public description: string;
	public eras: string = "TEST";
	public timeline: Timeline = new Timeline(null, "N/A", "N/A", "N/A", [], []);
	public references: Array<Reference>;

	/*
	public timeline2 = {
		id: 1,
		title: "Timeline Example",
		description: "Lorem ipsum...",
		eras: [
			{
				title: "First Age",
				description: "The First Age of Examplia, also known as the Age of the Woodelves.",
				years: [
					{
						year: 7431,
						exactness: "exact",
						dates: [
							{
								date: "-2",
								dateType: "relative",
								relativeDateTitle: "Winter's End",
								entries: [
									new Entry(1, "Example", "Prince Duran dies.", "death", 7431)
								]
							},
							{
								date: "-1",
								dateType: "relative",
								relativeDateTitle: "Winter's End",
								entries: [
									new Entry(1, "Example", "The elves suffer the Ocean's Call.", "other", 7431)
								]
							},
							{
								date: "0",
								dateType: "relative",
								relativeDateTitle: "Winter's End",
								entries: [
									new Entry(1, "Example", "They all celebrate Winter's End.", "other", 7431)
								]
							},
							{
								date: "3",
								dateType: "relative",
								relativeDateTitle: "Winter's End",
								entries: [
									new Entry(1, "Example", "The last guests leave.", "travel", 7431)
								]
							}
						]
					},
					{
						year: 7500,
						exactness: "circa",
						dates: [
							{
								date: "",
								dateType: "unknown",
								exactness: "",
								entries: [
									new Entry(1, "Example", "{9} is founded.", "birth", 7500)
								]
							}
						]
					},
					{
						year: 9550,
						exactness: "decade",
						dates: [
							{
								date: "Spring",
								dateType: "division",
								entries: [
									new Entry(1, "Example", "{9} is founded.", "birth", 9550)
								]
							}
						]
					},
					{
						year: 9800,
						exactness: "circa",
						dates: [
							{
								date: "Spring",
								dateType: "division",
								entries: [
									new Entry(1, "Example", "{3} is born to {0} and {1} in {9}.", "birth", 9800)
								]
							}
						]
					},
					{
						year: 9828,
						exactness: "exact",
						dates: [
							{
								date: "Summer",
								dateType: "division",
								entries: [
									new Entry(1, "Example", "{0} dies.", "death", 9828)
								]
							}
						]
					},
					{
						year: 9832,
						exactness: "exact",
						dates: [
							{
								date: "11th of Zarendahr",
								dateType: "date",
								entries: [
									new Entry(6, "Example", "{3} meets {5} in {11} in {8}.", "none", 9832)
								]
							},
							{
								date: "12th of Zarendahr",
								dateType: "date",
								entries: [
									new Entry(6, "Example", "{4}, {5} and {3} discover a plot by the Vrisidorian Empire to kill {6}.", "none", 9832),
									new Entry(7, "Example", "{5} rides to {7}.", "travel", 9832),
									new Entry(8, "Example", "{3} and {4} visits the temple in {8} to check up on {10}.", "travel", 9832),
									new Entry(7, "Example", "{3} and {4} kills a mysterious man who attacked them in the temple.", "attack", 9832),
								]
							}
						]
					}
				]
			}
		]
	};
	*/
	
	constructor(private timelineService: TimelineService) {
		
		console.log("entrylist constructor");

		this.timelineService.getTimeline().subscribe((data: Timeline) => {
			let newTimeline = new Timeline(data.id, data.title, data.description, data.statusCode, data.actors, data.eras);

			console.log("timeline", newTimeline);

			this.timeline = newTimeline;
			this.references = data.actors;
		},
		error => {
			console.log('error: ', error);
		});
	}
	

	ngOnInit(): void {
		console.log("ngOnInit");
	}

	getRelativeDate(date: number, title: string) {
		let result: string;

		if (date < 0) {
			result = Math.abs(date) + (date == -1 ? " day" : " days") + " before " + title;
		}
		else if (date == 0) {
			result = "The Day of " + title;
		}
		else {
			result = date + " days after " + title;
		}
		return result;
	}

}

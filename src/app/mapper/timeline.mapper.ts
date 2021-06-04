import { Injectable } from '@angular/core';
import { ITimeline } from '../interfaces/timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineMapper {

	constructor() { }

	public transformTimeline(rawTimeline: ITimeline): ITimeline {
		rawTimeline.eras.forEach(era => {
			era.years.forEach(year => {
				year.months.forEach(month => {
					month.days.forEach(day => {
						day.entries.forEach(entry => {
							console.log('single day');
							entry.elements = [];
							while (entry.description.includes("{")) {
								entry.description = "Mapped. Included character.";
								entry.elements.push({
									description: "Element",
									type: 'text'
								});
							}
						});
					});
				});
			});
		});

		let timeline: ITimeline = {
			actors: rawTimeline.actors,
			author: rawTimeline.author,
			description: rawTimeline.description,
			eras: rawTimeline.eras,
			id: rawTimeline.id,
			image: rawTimeline.image,
			statusCode: rawTimeline.statusCode,
			title: rawTimeline.title + ' mapped'
		};

		return timeline;
	}
}
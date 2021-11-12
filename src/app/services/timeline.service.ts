import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Timeline } from '../classes/timeline';
import { Observable } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable()
export class TimelineService {

	constructor(private http: HttpClient) {
		let url: string = "http://localhost:80/timeline/api/updateTimelineInfo",
			msg = {
				msg: "Test from client"
			};

		this.http.post(url, msg);
	}

	getTimeline(slug?: string) {
		if (slug !== undefined) {
			return this.http.get('http://localhost:80/timeline/api/getTimeline?slug='+slug);
		}
		else {
			return this.http.get('http://localhost:80/timeline/api/getTimeline');
		}
	}

	getTimelines() {
		return this.http.get('http://localhost:80/timeline/api/getTimelines');
	}

	getCharacter(slug: string) {
		return this.http.get('http://localhost:80/timeline/api/getCharacter?characterSlug='+slug);
	}

	getCharacters(timelineId: number, query: string) {
		return this.http.get(`http://localhost:80/timeline/api/getCharacters?timeline=${timelineId}&query=${query}`);
	}

	getTimelineInfo() {
		return this.http.get('http://localhost:80/timeline/api/getTimelineInfo');
	}

	testConnection() {
		return this.http.get('http://localhost:80/timeline/api/test');
	}

	updateTimeline(id: number, title: string, description: string) {
		var obj = JSON.stringify({'id': id, 'title': title, 'description': description});

		console.log('http://localhost:80/timeline/api/updateTimeline?obj='+obj);

		return this.http.get('http://localhost:80/timeline/api/updateTimeline?obj='+obj);
	}

	createEvent(era: number, year: number, month: number, day: number, type: number, description: string) {
		console.log("createEvent in service");

		var obj = JSON.stringify({
			'type': type,
			'description': description,
			'era': era,
			'year': year,
			'month': month,
			'day': day
		});

		return this.http.get('http://localhost:80/timeline/api/createEvent?obj='+obj);
	}

	getMonths(timelineId: number) {
		return this.http.get('http://localhost:80/timeline/api/getEventInputs?timeline='+timelineId);
	}
}
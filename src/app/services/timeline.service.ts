import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Timeline } from '../classes/timeline';
import { Observable } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable()
export class TimelineService {

	constructor(private http: HttpClient) {
		let url: string = "http://localhost:80/timeline/api/updateTimelineInfo";
		let msg = {
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
		return this.http.get('http://localhost:80/timeline/api/getCharacter?slug='+slug);
	}

	getTimelineInfo() {
		return this.http.get('http://localhost:80/timeline/api/getTimelineInfo');
	}

	testConnection() {
		return this.http.get('http://localhost:80/timeline/api/test');
	}

	updateTimeline(title: string, description: string) {
		var obj = JSON.stringify({'title': title, 'description': description});

		console.log('http://localhost:80/timeline/api/updateTimeline?obj='+obj);

		return this.http.get('http://localhost:80/timeline/api/updateTimeline?obj='+obj);
	}
}
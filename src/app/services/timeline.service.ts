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

		console.log("Before post");

		this.http.post(url, msg);
	}

	getTimeline(slug?: string) {
		if (slug !== undefined) {
			console.log('Slug defined.');
			return this.http.get('http://localhost:80/timeline/api/getTimeline?slug='+slug);
		}
		else {
			console.log('Slug not defined.');
			return this.http.get('http://localhost:80/timeline/api/getTimeline');
		}
	}

	getTimelineInfo() {
		return this.http.get('http://localhost:80/timeline/api/getTimelineInfo');
	}

	updateTimelineInfo(/*data: any*/) {
		/*
		let url: string = "http://localhost:80/timeline/api/updateTimelineInfo";
		let msg = {
			msg: "Test from client"
		};

		console.log("Before post");

		this.http.post(url, msg).toPromise().then(data => {
			console.log("data", data);
		});
		*/
	

		//return this.http.get('http://localhost:80/timeline/api/updateTimelineInfo');
		//return this.http.post('http://localhost:80/timeline/api/updateTimelineInfo', data);

		//return this.http.post<string>('http://localhost:80/timeline/api/updateTimelineInfo', {msg: "TEST"}, true);
	}

	testConnection() {
		return this.http.get('http://localhost:80/timeline/api/test');
	}
}
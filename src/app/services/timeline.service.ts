import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Timeline } from '../classes/timeline';
import { Observable } from 'rxjs';

@Injectable()
export class TimelineService {
	constructor(private http: HttpClient) {
	}

	getTimeline() {
		return this.http.get('http://localhost:80/timeline/api/getTimeline');
	}

	getTimelineInfo() {
		return this.http.get('http://localhost:80/timeline/api/getTimelineInfo');
	}

	testConnection() {
		return this.http.get('http://localhost:80/timeline/api/test');
	}
}
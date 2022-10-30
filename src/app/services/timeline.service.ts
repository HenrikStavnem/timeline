import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Timeline } from '../classes/timeline';
import { Observable } from 'rxjs';
//import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

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
			return this.http.get('http://localhost:80/timeline/api/getTimelinePOC3?slug='+slug);
		}
		else {
			return this.http.get('http://localhost:80/timeline/api/getTimeline');
		}
	}

	getTimelines() {
		return this.http.get('http://localhost:80/timeline/api/getTimelines');
	}

	getCharacter(slug: string) {
		return this.http.get('http://localhost:80/timeline/api/character/get.php?characterSlug='+slug);
	}

	getCharacters(timelineId: number, query: string) {
		return this.http.get(`http://localhost:80/timeline/api/getCharacters?timeline=${timelineId}&query=${query}`);
	}

	getCharactersByTimeline(timelineSlug: string, query: string) {
		return this.http.get(`http://localhost:80/timeline/api/getCharactersByTimeline?timeline=${timelineSlug}&query=${query}`);
	}

	getTimelineInfo() {
		return this.http.get('http://localhost:80/timeline/api/getTimelineInfo');
	}

	testConnection() {
		return this.http.get('http://localhost:80/timeline/api/test');
	}

	updateTimeline(id: number, title: string, description: string) {
		let obj = JSON.stringify({'id': id, 'title': title, 'description': description});

		console.log('http://localhost:80/timeline/api/updateTimeline?obj='+obj);

		return this.http.get('http://localhost:80/timeline/api/updateTimeline?obj='+obj);
	}

	createEra(eraOjb: Object) {
		console.log("createEra in service");

		return this.http.get('http://localhost:80/timeline/api/createEra?obj='+JSON.stringify(eraOjb));
	}

	createEvent(era: number, exactness: string, year: number, month: number, day: number, type: number, description: string) {
		console.log("createEvent in service");

		let obj = JSON.stringify({
			'type': type,
			'description': description,
			'era': era,
			'exactness': exactness,
			'year': year,
			'month': month,
			'day': day
		});
		
		console.log("obj", obj);

		return this.http.get('http://localhost:80/timeline/api/createEvent?obj='+obj);
	}

	createCharacter(timelineId: number, firstName: string, lastName: string, description: string, imageUrl: string, coverImageUrl: string, slug: string) {
		let obj = JSON.stringify({
			'timelineId': timelineId,
			'firstName': firstName,
			'lastName': lastName,
			'description': description,
			'imageUrl': imageUrl,
			'coverImageUrl': coverImageUrl,
			'slug': slug
		});

		console.log('obj', obj);

		return this.http.get('http://localhost:80/timeline/api/character/create.php?obj='+obj);
	}

	updateCharacter(characterId: number, firstName: string, lastName: string, description: string, imageUrl: string, coverImageUrl: string, slug: string) {
		let obj = JSON.stringify({
			'characterId': characterId,
			'firstName': firstName,
			'lastName': lastName,
			'description': description,
			'imageUrl': imageUrl,
			'coverImageUrl': coverImageUrl,
			'slug': slug
		});

		return this.http.get('http://localhost:80/timeline/api/character/update.php?obj='+obj);
	}

	getEventInputDate(timelineId: number) {
		return this.http.get('http://localhost:80/timeline/api/getEventInputs?timeline='+timelineId);
	}

	getTimelineId(timelineSlug: string) {
		return this.http.get(`http://localhost:80/timeline/api/timeline/getId.php?timelineSlug=${timelineSlug}`);
	}

	getEras(timelineId: number) {
		return this.http.get(`http://localhost:80/timeline/api/eras/get?timeline=${timelineId}`);
	}

	getMonths(timelineId: number) {
		return this.http.get(`http://localhost:80/timeline/api/months/get?timeline=${timelineId}`);
	}

	updateMonths(timelineId: number, months: any[]) {
		console.log('months', months);

		return this.http.get(`http://localhost:80/timeline/api/months/get?timeline=${timelineId}`);
	}

	getPlayer(slug: string) {
		return this.http.get(`http://localhost/timeline/api/player/get?slug=${slug}`);
	}
}
import { Component } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TimelineService]
})
export class AppComponent {
	constructor() {
	}	
}

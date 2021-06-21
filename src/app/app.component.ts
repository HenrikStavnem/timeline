import { Component } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline.service'
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TimelineService, ToastService]
})
export class AppComponent {
	constructor() {
	}	
}

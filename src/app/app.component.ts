import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TimelineService } from 'src/app/services/timeline.service'
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TimelineService, ToastService]
})
export class AppComponent {
	constructor(
		translate: TranslateService
	) {
		translate.setDefaultLang('en');
		translate.use('en');
	}	
}

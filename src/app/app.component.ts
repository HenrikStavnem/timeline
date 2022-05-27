import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TimelineService } from 'src/app/services/timeline.service'
import { ToastService } from 'src/app/services/toast.service';
import { SidebarService } from './services/sidebar.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TimelineService, ToastService]
})
export class AppComponent {
	isAsideOpen: boolean = false;
	isAsideBOpen: boolean = false;

	page: string = "";

	constructor(
		translate: TranslateService,
		private sidebarService: SidebarService
	) {
		translate.setDefaultLang('en');
		translate.use('en');
	}

	ngOnInit(): void {
		this.sidebarService.change.subscribe((eventData: any) => {
			this.isAsideOpen = eventData.isOpen;
		});
	}
}

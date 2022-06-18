import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TimelineService } from 'src/app/services/timeline.service'
import { ToastService } from 'src/app/services/toast.service';
import { SidebarService } from './services/sidebar.service';
import { filter } from 'rxjs/operators';

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

	//route: RouterEvent;
	routeString: string = "";

	routePageType: string = "";
	routeParamId: string | number = null;

	constructor(
		translate: TranslateService,
		private sidebarService: SidebarService,
		private router: Router,
	) {
		translate.setDefaultLang('en');
		translate.use('en');

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: NavigationEnd) => {
			this.routeString = val.url;

			let activatedRoute: ActivatedRoute = this.getActivatedRoute(),
				snapshot: ActivatedRouteSnapshot = activatedRoute.snapshot;

			this.routePageType = snapshot.data.pageType;
			this.routeParamId = snapshot.params.id;
		});
	}

	ngOnInit(): void {
		this.sidebarService.change.subscribe((eventData: any) => {
			this.isAsideOpen = eventData.isOpen;
		});
	}

	private getActivatedRoute(): ActivatedRoute {
		let route = this.router.routerState.root;
		while (route.firstChild) {
			route = route.firstChild;
		}

		return route;
	}
}

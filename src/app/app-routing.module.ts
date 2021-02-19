import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/modules/routes/timeline/timeline.module').then(module => module.TimelineModule),
		data: {pageType: 'index'}
	},
	{
		path: 'timeline/:id',
		loadChildren: () => import('src/app/modules/routes/timeline/timeline.module').then(module => module.TimelineModule),
		data: {pageType: 'timeline'}
	},
	{
		path: 'test',
		loadChildren: () => import('src/app/modules/routes/test/test.module').then(module => module.TestModule),
		data: {pageType: 'timeline'}
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

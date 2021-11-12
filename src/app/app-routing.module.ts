import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/modules/routes/index/index.module').then(module => module.IndexModule),
		data: {pageType: 'index'}
	},
	{
		path: 'timeline/:id',
		loadChildren: () => import('src/app/modules/routes/timeline/timeline.module').then(module => module.TimelineModule),
		data: {pageType: 'timeline'}
	},
	{
		path: 'timeline/:id/:id2',
		loadChildren: () => import('src/app/modules/routes/character/character.module').then(module => module.CharacterModule),
		data: {pageType: 'character'}
	},
	{
		path: 'test',
		loadChildren: () => import('src/app/modules/routes/test/test.module').then(module => module.TestModule),
		data: {pageType: 'test'}
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

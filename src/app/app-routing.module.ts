import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	/*
	{
		path: '',
		//loadChildren: () => import('@portal-app/modules/routes/---/---.module').then(module => module.---Module),
		data: {pageType: 'index'}
	},
	{
		path: 'timeline/:id',
		//loadChildren: 
		data: {pageType: 'timeline'}
	}
	*/
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { --Component } from '';

const routes: Routes = [
	{
		path: '',
		component: Comment // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TimelineRoutingModule { };
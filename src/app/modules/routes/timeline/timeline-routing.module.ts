import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
//import { --Component } from '';

const routes: Routes = [
	{
		path: '',
		component: TimelineComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TimelineRoutingModule { };
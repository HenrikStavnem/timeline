import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTimelineComponent } from './components/manage-timeline/manage-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';
//import { --Component } from '';

const routes: Routes = [
	{
		path: '',
		component: TimelineComponent // change to Timeline component
	},
	{
		path: 'edit',
		component: ManageTimelineComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TimelineRoutingModule { };
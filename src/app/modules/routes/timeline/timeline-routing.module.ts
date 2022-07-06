import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTimelineComponent } from './components/manage-timeline/manage-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
	{
		path: '',
		component: TimelineComponent
	},
	{
		path: 'edit',
		component: ManageTimelineComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TimelineRoutingModule { };
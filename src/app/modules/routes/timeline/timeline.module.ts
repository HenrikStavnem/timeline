import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
	declarations: [
		TimelineComponent
	],
	imports: [
		CommonModule,
		TimelineRoutingModule
	]
})
export class TimelineModule { }
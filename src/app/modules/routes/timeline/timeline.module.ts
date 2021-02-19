import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { EntryComponent} from './components/timeline/entry/entry.component'
import { EntryDescriptionPipe } from 'src/app/pipes/entry-description.pipe';

@NgModule({
	declarations: [
		TimelineComponent,
		EntryComponent,
		EntryDescriptionPipe
	],
	imports: [
		CommonModule,
		TimelineRoutingModule
	]
})
export class TimelineModule { }
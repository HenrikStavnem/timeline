import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ManageTimelineComponent } from './components/manage-timeline/manage-timeline.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { EntryComponent} from './components/timeline/entry/entry.component'
import { CenturyPipe } from 'src/app/pipes/century.pipe'
import { EntryDescriptionPipe } from 'src/app/pipes/entry-description.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
	declarations: [
		TimelineComponent,
		ManageTimelineComponent,
		EntryComponent,
		EntryDescriptionPipe,
		CenturyPipe
	],
	imports: [
		CommonModule,
		TimelineRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		CardComponent
	]
})
export class TimelineModule { }
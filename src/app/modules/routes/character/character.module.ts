import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './components/character/character.component';
/*
import { TimelineRoutingModule } from './timeline-routing.module';
import { EntryComponent} from './components/timeline/entry/entry.component'
import { EntryDescriptionPipe } from 'src/app/pipes/entry-description.pipe';
*/

@NgModule({
	declarations: [
		CharacterComponent
	],
	imports: [
		CommonModule,
		CharacterRoutingModule
	]
})
export class CharacterModule { }
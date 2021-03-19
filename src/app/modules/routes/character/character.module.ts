import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './components/character/character.component';

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
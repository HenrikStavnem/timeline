import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './components/character/character.component';
import { CustomButton } from 'src/app/components/custombutton/custombutton.component';

@NgModule({
	declarations: [
		CharacterComponent
	],
	imports: [
		CommonModule,
		CharacterRoutingModule,
		CustomButton
	]
})
export class CharacterModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './components/characters.component';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
	declarations: [
		CharactersComponent
	],
	imports: [
		CommonModule,
		CardComponent,
		CharactersRoutingModule
	]
})
export class CharactersModule { }
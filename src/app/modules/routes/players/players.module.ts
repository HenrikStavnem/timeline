import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './components/player/players.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from 'src/app/components/card/card.component';


@NgModule({
	declarations: [
		PlayersComponent,
	],
	imports: [
		CommonModule,
		CardComponent,
		PlayersRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class PlayersModule { }
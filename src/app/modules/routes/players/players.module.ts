import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './components/player/players.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [
		PlayersComponent,
	],
	imports: [
		CommonModule,
		PlayersRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class PlayersModule { }
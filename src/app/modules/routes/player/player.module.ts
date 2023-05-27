import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from 'src/app/components/card/card.component';


@NgModule({
	declarations: [
		PlayerComponent,
	],
	imports: [
		CommonModule,
		CardComponent,
		PlayerRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class PlayerModule { }
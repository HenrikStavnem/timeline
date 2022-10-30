import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [
		PlayerComponent,
	],
	imports: [
		CommonModule,
		PlayerRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class PlayerModule { }
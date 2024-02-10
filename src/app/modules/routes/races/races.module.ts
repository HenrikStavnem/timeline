import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './components/races/races.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { CustomButton } from 'src/app/components/custombutton/custombutton.component';


@NgModule({
	declarations: [
		RacesComponent,
	],
	imports: [
		CommonModule,
		CardComponent,
		CustomButton,
		RacesRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class RacesModule { }
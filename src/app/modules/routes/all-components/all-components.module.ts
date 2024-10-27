import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponentsRoutingModule } from './all-components-routing.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { AllComponentsComponent } from './components/all-components';
import { AbilityScoresComponent } from 'src/app/components/ability-scores/ability-scores.component';

@NgModule({
	declarations: [
		AllComponentsComponent
	],
	imports: [
		AbilityScoresComponent,
		CardComponent,
		CommonModule,
		AllComponentsRoutingModule,
	]
})
export class AllComponentsModule { }
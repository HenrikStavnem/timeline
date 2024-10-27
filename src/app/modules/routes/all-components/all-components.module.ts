import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponentsRoutingModule } from './all-components-routing.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { AllComponentsComponent } from './components/all-components';

@NgModule({
	declarations: [
		AllComponentsComponent
	],
	imports: [
		CardComponent,
		CommonModule,
		AllComponentsRoutingModule,
	]
})
export class AllComponentsModule { }
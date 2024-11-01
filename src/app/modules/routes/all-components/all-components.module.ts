import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponentsRoutingModule } from './all-components-routing.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { AllComponentsComponent } from './components/all-components';
import { AbilityScoresComponent } from 'src/app/components/ability-scores/ability-scores.component';
import { HeadlineComponent } from 'src/app/components/headline/headline.component';
import { CustomButton } from 'src/app/components/custombutton/custombutton.component';
import { EditIcon } from 'src/app/components/icons/Edit.component';
import { HexagonIcon } from 'src/app/components/icons/Hexagon.components';
import { HexagonPlayerIcon } from 'src/app/components/icons/HexagonPlayer.components';

@NgModule({
	declarations: [
		AllComponentsComponent
	],
	imports: [
		AbilityScoresComponent,
		CardComponent,
		CommonModule,
		CustomButton,
		EditIcon,
		HexagonIcon,
		HexagonPlayerIcon,
		HeadlineComponent,
		AllComponentsRoutingModule,
	]
})
export class AllComponentsModule { }
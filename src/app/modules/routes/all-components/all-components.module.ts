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
import { Paragraph } from 'src/app/components/paragraph/paragraph.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { QuoteComponent } from 'src/app/components/quote/quote.component';

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
		HeroComponent,
		Paragraph,
		QuoteComponent,
		AllComponentsRoutingModule,
	]
})
export class AllComponentsModule { }
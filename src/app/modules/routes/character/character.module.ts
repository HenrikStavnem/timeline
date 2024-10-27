import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './components/character/character.component';
import { CustomButton } from 'src/app/components/custombutton/custombutton.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { Paragraph } from 'src/app/components/paragraph/paragraph.component';
import { EditIcon } from "../../../components/icons/Edit.component";

@NgModule({
	declarations: [
		CharacterComponent
	],
	imports: [
    CardComponent,
    CommonModule,
    CharacterRoutingModule,
    CustomButton,
    Paragraph,
    EditIcon
]
})
export class CharacterModule { }
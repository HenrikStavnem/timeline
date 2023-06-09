import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { Paragraph } from "../../../components/paragraph/paragraph.component";


@NgModule({
    declarations: [
        PlayerComponent,
    ],
    exports: [
        TranslateModule
    ],
    imports: [
        CommonModule,
        CardComponent,
        PlayerRoutingModule,
        TranslateModule.forChild(),
        Paragraph
    ]
})
export class PlayerModule { }
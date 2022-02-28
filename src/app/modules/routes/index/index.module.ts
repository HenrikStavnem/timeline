import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [
		IndexComponent,
		
	],
	imports: [
		CommonModule,
		IndexRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class IndexModule { }
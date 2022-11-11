import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './components/location/location.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [
		LocationComponent,
	],
	imports: [
		CommonModule,
		LocationRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class LocationModule { }
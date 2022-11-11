import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './components/locations/locations.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [
		LocationsComponent,
	],
	imports: [
		CommonModule,
		LocationsRoutingModule,
		TranslateModule.forChild()
	],
	exports: [
		TranslateModule
	]
})
export class LocationsModule { }
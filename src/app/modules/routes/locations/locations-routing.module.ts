import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsComponent} from './components/locations/locations.component'

const routes: Routes = [
	{
		path: '',
		component: LocationsComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LocationsRoutingModule { };
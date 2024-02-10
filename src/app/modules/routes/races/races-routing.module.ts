import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacesComponent} from './components/races/races.component'

const routes: Routes = [
	{
		path: '',
		component: RacesComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RacesRoutingModule { };
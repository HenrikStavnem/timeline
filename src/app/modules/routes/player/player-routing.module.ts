import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent} from './components/player/player.component'

const routes: Routes = [
	{
		path: '',
		component: PlayerComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlayerRoutingModule { };
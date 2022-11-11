import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent} from './components/player/players.component'

const routes: Routes = [
	{
		path: '',
		component: PlayersComponent // change to Timeline component
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlayersRoutingModule { };
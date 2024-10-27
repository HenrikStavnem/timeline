import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponentsComponent } from './components/all-components';
// import { CharacterComponent } from './components/character/character.component';

const routes: Routes = [
	{
		path: '',
		component: AllComponentsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AllComponentsRoutingModule { };
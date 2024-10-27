import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/modules/routes/index/index.module').then(module => module.IndexModule),
		data: {pageType: 'index'}
	},
	{
		path: 'timeline/:id/locations/:id2',
		loadChildren: () => import('src/app/modules/routes/location/location.module').then(module => module.LocationModule),
		data: {pageType: 'location'}
	},
	{
		path: 'timeline/:id/locations',
		loadChildren: () => import('src/app/modules/routes/locations/locations.module').then(module => module.LocationsModule),
		data: {pageType: 'locations'}
	},
	{
		path: 'player/:id',
		loadChildren: () => import('src/app/modules/routes/player/player.module').then(module => module.PlayerModule),
		data: {pageType: 'player'}
	},
	{
		path: 'players',
		loadChildren: () => import('src/app/modules/routes/players/players.module').then(module => module.PlayersModule),
		data: {pageType: 'players'}
	},
	{
		path: 'races',
		loadChildren: () => import('src/app/modules/routes/races/races.module').then(module => module.RacesModule),
		data: {pageType: 'races'}
	},
	{
		path: 'timeline/:id',
		loadChildren: () => import('src/app/modules/routes/timeline/timeline.module').then(module => module.TimelineModule),
		data: {pageType: 'timeline'}
	},
	{
		path: 'timeline/:id/characters',
		loadChildren: () => import('src/app/modules/routes/characters/characters.module').then(module => module.CharactersModule),
		data: {pageType: 'character-list'},
		title: 'Characters'
	},
	{
		path: 'timeline/:id/:id2',
		loadChildren: () => import('src/app/modules/routes/character/character.module').then(module => module.CharacterModule),
		data: {pageType: 'character'}
	},
	{
		path: 'test',
		loadChildren: () => import('src/app/modules/routes/test/test.module').then(module => module.TestModule),
		data: {pageType: 'test'}
	},
	{
		path: 'all-components',
		loadChildren: () => import('src/app/modules/routes/all-components/all-components.module').then(module => module.AllComponentsModule),
		data: {pageType: 'all-components'},
		title: 'All Components'
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
	exports: [RouterModule]
})
export class AppRoutingModule { }

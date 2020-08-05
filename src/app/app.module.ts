import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EntryComponent } from './components/entry/entry.component';
import { EntrylistComponent } from './components/entrylist/entrylist.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { WindowComponent } from './components/modal/window/window.component';
import { EntryDescriptionPipe } from './pipes/entry-description.pipe';

@NgModule({
	declarations: [
		AppComponent,
		EntryComponent,
		EntrylistComponent,
		MenuComponent,
		ModalComponent,
		WindowComponent,
		EntryDescriptionPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

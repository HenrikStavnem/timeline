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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';

import { TestDialogComponent } from './components/dialogs/test-dialog/test-dialog.component';
import { TimelineService } from './services/timeline.service';

@NgModule({
	declarations: [
		AppComponent,
		EntryComponent,
		EntrylistComponent,
		MenuComponent,
		ModalComponent,
		WindowComponent,
		EntryDescriptionPipe,
		TestDialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatDialogModule,
		MatTabsModule,
		MatInputModule,
		ReactiveFormsModule
	],
	exports: [
		ReactiveFormsModule
	],
	entryComponents: [
		TestDialogComponent
	],
	providers: [
		TimelineService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

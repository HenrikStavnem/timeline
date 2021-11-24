import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AsideComponent } from './components/modal/aside/aside.component';
import { CharacterEditComponent } from './components/character-edit/character-edit.component';
import { CharacterEditGendersComponent } from './components/character-edit/character-edit-genders/character-edit-genders.component';
import { CharacterEditNamesComponent } from './components/character-edit/character-edit-names/character-edit-names.component';
import { EraEditComponent } from './components/era-edit/era-edit.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { WindowComponent } from './components/modal/window/window.component';
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
		AsideComponent,
		CharacterEditComponent,
		CharacterEditGendersComponent,
		CharacterEditNamesComponent,
		EraEditComponent,
		MenuComponent,
		ModalComponent,
		ToastComponent,
		WindowComponent,
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

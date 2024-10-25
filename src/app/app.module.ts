import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

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
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { TestDialogComponent } from './components/dialogs/test-dialog/test-dialog.component';
import { TimelineService } from './services/timeline.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CharacterSidebarPageComponent } from './components/sidebar/pages/character-sidebar-page/character-sidebar-page.component';
import { EraSidebarPageComponent } from './components/sidebar/pages/era-sidebar-page/era-sidebar-page.component';
import { ErasSidebarPageComponent } from './components/sidebar/pages/eras-sidebar-page copy/eras-sidebar-page.component';
import { MonthsSidebarPageComponent } from './components/sidebar/pages/months-sidebar-page/months-sidebar-page.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({ declarations: [
        AppComponent,
        AsideComponent,
        CharacterEditComponent,
        CharacterEditGendersComponent,
        CharacterEditNamesComponent,
        CharacterSidebarPageComponent,
        EraEditComponent,
        EraSidebarPageComponent,
        ErasSidebarPageComponent,
        MonthsSidebarPageComponent,
        MenuComponent,
        ModalComponent,
        SidebarComponent,
        ToastComponent,
        WindowComponent,
        TestDialogComponent
    ],
    exports: [
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [
        TimelineService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from 'src/app/components/dateinput/dateinput.component';

@NgModule({
	declarations: [
		TestComponent
	],
	imports: [
		CommonModule,
		DateInputComponent,
		TestRoutingModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class TestModule { }
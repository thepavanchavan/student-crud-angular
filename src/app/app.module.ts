import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';

@NgModule({
  declarations: [AppComponent, StudentComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot([
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    { path: 'student', component: StudentComponent }
  ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

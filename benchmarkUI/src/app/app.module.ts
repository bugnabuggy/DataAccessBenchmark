import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Service } from './service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MatButtonModule,MatPaginatorModule,MatTableModule,MatInputModule,MatTabsModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatTabsModule,
    BrowserAnimationsModule,
    CdkTableModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

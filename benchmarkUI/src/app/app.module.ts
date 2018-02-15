import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Service } from './service';
import { D3_Service } from './d3-service';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';

import {MatButtonModule,MatPaginatorModule,MatTableModule,MatInputModule,MatTabsModule,MatSelectModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


import { HistoryComponent }   from './history.component';
import { SessionComponent }   from './session.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    SessionComponent
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
    MatSelectModule,
    BrowserAnimationsModule,
    CdkTableModule,
    AppRoutingModule
  ],
  providers: [Service,D3_Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

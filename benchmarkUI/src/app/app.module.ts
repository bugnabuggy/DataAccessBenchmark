import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTPService } from './services/httpService';
import { ChartService } from './services/chartService';
import { SortFunctionService } from './services/sortFunctionService'

import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';

import {MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


import { HistoryComponent }   from './components/history.component';
import { SessionComponent }   from './components/session.component';

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
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CdkTableModule,
    AppRoutingModule
  ],
  providers: [HTTPService ,ChartService,SortFunctionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

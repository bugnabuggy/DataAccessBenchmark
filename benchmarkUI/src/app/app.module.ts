import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartService } from './services/chartService';
import { SortFunctionService } from './services/sortFunctionService';
import { QueriesEFOperationService } from './services/queriesEFOperationService';
import { QueriesSQLOperationService } from './services/queriesSQLOperationService';
import { DataService } from './services/dataService'
import { InterceptService } from './services/interceptorService';
import { SnackBarService } from './services/snackBarService'

import { SiteDataService } from './services/siteDataService'

import { AppComponent } from './components/app.component'
import { HistoryComponent } from './components/history.component'
import { SessionComponent } from './components/session.component'

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';

import {
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        MatListModule,
        MatDividerModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
      } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';




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
    MatSnackBarModule,
    BrowserAnimationsModule,
    CdkTableModule,
    AppRoutingModule
  ],
  providers: [
    ChartService,
    SortFunctionService,
    QueriesEFOperationService,
    QueriesSQLOperationService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    SiteDataService,
    SnackBarService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

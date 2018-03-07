import {  async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AppComponent } from '../app/components/app.component';
import { HistoryComponent }   from '../app/components/history.component';
import { SessionComponent }   from '../app/components/session.component';

import { SiteDataService } from '../app/services/siteDataService'
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';
import * as r                         from  '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import { By }                 from '@angular/platform-browser';
import {  Component, DebugElement, Type } from '@angular/core';
import { Location }           from '@angular/common'
import { AppModule, }          from '../app/app.module';

import { click,RouterLinkDirectiveStub }              from './testing';

import { NavLinks } from '../app/models/navLinks';

import {
  MatTabsModule,
  MatProgressSpinnerModule
} from '@angular/material';

let comp:     AppComponent;

let fixture:  ComponentFixture<AppComponent>;


let router:   Router;
let location: SpyLocation;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [  RouterTestingModule,  MatTabsModule,
        MatProgressSpinnerModule ],
      providers: [
         SiteDataService

      ]
    }).compileComponents();
  }));


  it('Spinner-Visible visible', fakeAsync(()=>{
    fixture = TestBed.createComponent(AppComponent);
    let siteDataSrv = fixture.debugElement.injector.get(SiteDataService);
    siteDataSrv.isSpinnerVisible = true;
    advance();
    
    let div = fixture.nativeElement.querySelector('.spinner')
    expect(div).not.toBeNull();
  }))




it('Spinner-Visible unvisible', fakeAsync(()=>{
  fixture = TestBed.createComponent(AppComponent);
  let div = fixture.nativeElement.querySelector('.spinner')
  expect(div).toBeNull();
}))



it('nav links', fakeAsync(()=>{
  let navLinks = fixture.componentInstance.navLinks;
  expect(navLinks.length).toEqual(2);
}))

it('router-outlet', fakeAsync(()=>{
  let routeroutlet = fixture.nativeElement.querySelector('router-outlet')
  expect(routeroutlet.nodeName).toEqual('ROUTER-OUTLET');
}))


});

function advance(): void {
  tick(); // wait while navigating
  fixture.detectChanges(); // update view
  tick(); // wait for async data to arrive
}
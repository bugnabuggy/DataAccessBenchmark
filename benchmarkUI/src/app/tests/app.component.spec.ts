import {  async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from '../components/app.component';
import { HistoryComponent }   from '../components/history.component';
import { SessionComponent }   from '../components/session.component';

import { SiteDataService } from '../services/siteDataService'
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';
import * as r                         from  '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import { By }                 from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location }           from '@angular/common'
import { AppModule }          from '../app.module';

import { TestSiteDataService } from './testService/test-SiteDataService'


let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let page:     Page;
let router:   Router;
let location: SpyLocation;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [ AppModule, RouterTestingModule ],
      providers: [
        { provide: SiteDataService, useValue: TestSiteDataService },

      ]
    }).compileComponents();
  }));
  it('should navigate to "session" immediately', fakeAsync(() => {
    createComponent();
    tick(); // wait for async data to arrive
    expect(location.path()).toEqual('/Session', 'after initialNavigation()');
    expectElementOf(SessionComponent);
  }));
});

function advance(): void {
  tick(); // wait while navigating
  fixture.detectChanges(); // update view
  tick(); // wait for async data to arrive
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();
  advance();

  page = new Page();
}

class Page {
  session: DebugElement;
  history: DebugElement;

  // for debugging
  comp: AppComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.session = links[0];
    this.history = links[1];


    // for debugging
    this.comp    = comp;
    this.fixture = fixture;
    this.router  = router;
  }
}
function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}
<<<<<<< HEAD
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SessionComponent } from '../components/session.component';
=======
import { TestBed, async } from '@angular/core/testing';
import { SessionComponent} from '../components.ts/session.component';
>>>>>>> parent of 92df522... Revert "typesetting history and session html"
import {MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule} from '@angular/material';
<<<<<<< HEAD
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTPService } from '../services/httpService';
import { HttpModule } from '@angular/http';

class testQuote {
  cpu: '1'
  ram: '2'
  hddType:'3'
  hddModels:'4'
}

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  beforeEach(async(() => {
    const httpServiceStub = jasmine.createSpyObj('HTTPService',['serverFeatures'])
    getQuoteSpy = httpServiceStub.serverFeatures.and.returnValue(testQuote )
=======
    import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
    import { HTTPService } from '../services/httpService';
    import { HttpModule } from '@angular/http';
describe('SessionComponent', () => {
  beforeEach(async(() => {
>>>>>>> parent of 92df522... Revert "typesetting history and session html"
    TestBed.configureTestingModule({
      declarations: [
        SessionComponent
      ], 
      imports: [
        HttpModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatListModule,
        MatInputModule,
        MatTabsModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
<<<<<<< HEAD
      providers: [{provide: HTTPService, useValue: httpServiceStub }],
    }).compileComponents();
  }));
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;

describe('when test with synchronous observable', () => {
  it('should not show quote before OnInit', () => {
    fixture.detectChanges();
    expect(getQuoteSpy.calls.any()).toBe(testQuote, "wrong address");
  });

});
});
=======
      providers: [HTTPService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SessionComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SessionComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
>>>>>>> parent of 92df522... Revert "typesetting history and session html"

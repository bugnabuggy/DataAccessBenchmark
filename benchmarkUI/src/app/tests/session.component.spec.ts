import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SessionComponent } from '../components/session.component';
import {MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule} from '@angular/material';
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

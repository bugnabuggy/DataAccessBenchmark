import { TestBed, async } from '@angular/core/testing';
import { SessionComponent} from '../components.ts/session.component';
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
describe('SessionComponent', () => {
  beforeEach(async(() => {
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
import { TestBed, async, ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { SessionComponent } from '../app/components/session.component';
import {MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SortFunctionService } from '../app/services/sortFunctionService';
import { QueriesEFOperationService } from '../app/services/queriesEFOperationService'
import { QueriesSQLOperationService } from '../app/services/queriesSQLOperationService';
import { DataService } from '../app/services/dataService';
import { HttpModule } from '@angular/http';
import { asyncData, asyncError } from './testing/async-observable-helpers';
import { SnackBarService } from '../app/services/snackBarService'
import { HttpClientTestingModule, HttpTestingController,  } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Endpoints } from "../app/models/endpoints";

let testData = {
  cpu: '1',
  ram: '2',
  hddType:'3',
  hddModels:'4'
}
let fixture: ComponentFixture<SessionComponent>;
describe('SessionComponent', () => {
  let component: SessionComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dataService: DataService
  let snackBar: SnackBarService

  let queriesSQLOperationService:QueriesSQLOperationService
  let queriesEFOperationService: QueriesEFOperationService
  beforeEach(() => {
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
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        SortFunctionService,
        SnackBarService,
        QueriesEFOperationService,
        QueriesSQLOperationService,
        DataService
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    dataService = new DataService(httpClient);
    queriesEFOperationService = new QueriesEFOperationService(httpClient)
  });
  afterEach(() => { 

    httpTestingController.verify();
  });
  it(`should call server info endpoint and get data`, fakeAsync( () => {
    fixture = TestBed.createComponent(SessionComponent)
    let session = fixture.componentInstance;
    let cpu = session.CPU
    expect(cpu).toEqual(undefined)
    advance()
    const req = httpTestingController.expectOne(Endpoints.baseURL + 'ServerInfo');
    req.flush(testData);
    advance()
    let matListItem = fixture.nativeElement.querySelector('mat-list-item')
    expect(matListItem.innerText).toContain('CPU: 1')
  }));

  it('should call server add records and get info about operation', fakeAsync( () => {
    fixture = TestBed.createComponent(SessionComponent)
    let session = fixture.componentInstance;
    let routeroutlet = fixture.nativeElement.querySelector('router-outlet')
  }));

});
function advance(): void {
  tick(); // wait while navigating
  fixture.detectChanges(); // update view
  tick(); // wait for async data to arrive
}
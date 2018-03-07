// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // Other imports

// import { DataService } from "../app/services/dataService";
// import { Endpoints } from "../app/models/endpoints";

// let httpClientSpy: { get: jasmine.Spy };
// let dataService: DataService;
// let httpClient: HttpClient;
// let httpTestingController: HttpTestingController;

// describe('dataService tests', () => {
//   beforeEach(()=>{
//     TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule]
//     });
//     httpClient = TestBed.get(HttpClient);
//     httpTestingController = TestBed.get(HttpTestingController);
//     dataService = new DataService(httpClient);
//   });

//   afterEach(()=>{
//     httpTestingController.verify();
//   });

//   it('should call server info endpoint and get data', (done)=>{
//     let testData = { cpu: 'Pentium' };
//     dataService.serverFeatures().then((data) => {
//         expect(data).toEqual(testData);
//         done();
//     });
//     debugger
//     const req = httpTestingController.expectOne(Endpoints.baseURL + 'ServerInfo');
//     req.flush(testData);
//     expect(req.request.method).toEqual('GET');
//   });
// });
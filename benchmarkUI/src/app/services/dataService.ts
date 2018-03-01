import { IDataService } from './IDataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../models/endpoints';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService implements IDataService {
    constructor(
        private http: HttpClient
      ) { }

    fill(recordsCount: any): Promise<any> {
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        var options =  {
          headers: headers
         };
        return this.http.post(Endpoints.baseURL+'EF',recordsCount,options)
        .toPromise()
        .then(resp=> { return resp});
    }
    clearHistory(): void {
        this.http.delete(Endpoints.baseURL+'HistoryRecordsTest')
        .toPromise()
        .then(resp=> { return resp});
    }
    getRecordsForHistory(): Promise<any> {
        return this.http.get(Endpoints.baseURL+'HistoryRecordsTest')
        .toPromise()
        .then(resp=> { return resp});
    }
    serverFeatures(): Promise<any> {
        return this.http.get(Endpoints.baseURL+'ServerInfo')
        .toPromise()
        .then(resp=> {return resp});
    }
}
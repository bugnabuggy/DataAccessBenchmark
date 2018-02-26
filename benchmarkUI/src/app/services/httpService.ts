import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Endpoints } from '../models/endpoints'


@Injectable()
export class HTTPService {

    constructor(

        private http: Http
      ) { }


      selectEF():Promise<any>{
        return this.http.get(Endpoints.baseURL+'EF')
        .toPromise()
        .then(resp=> {return resp});
      }

      selectSql():Promise<any>{
        return this.http.get(Endpoints.baseURL+'Sql')
        .toPromise()
        .then(resp=> {return resp});
      }

      fill(recordsCount):Promise<any>{
        return this.http.post(Endpoints.baseURL+'EF',recordsCount,{headers:new Headers({
          'Content-Type': 'application/json charset=utf-8'})})
        .toPromise()
        .then(resp=> {return resp});
      }

      clearHistory():void{
        this.http.delete(Endpoints.baseURL+'HistoryRecordsTest')
        .toPromise()
        .then(resp=> { return resp});
      }

      flushEF():Promise<any>{
        return this.http.delete(Endpoints.baseURL+'EF/Flush')
        .toPromise()
        .then(resp=> { return resp});
      }
      getRecordsForHistory():Promise<any>{
        return this.http.get(Endpoints.baseURL+'HistoryRecordsTest')
        .toPromise()
        .then(resp=> { return resp});
      }

      flushsql():Promise<any>{
        return this.http.delete(Endpoints.baseURL+'Sql/Flush')
        .toPromise()
        .then(resp=> { return resp});
      }

      deleteEF(countDeleteEF):Promise<any>{
        return this.http.delete(Endpoints.baseURL+'EF/'+countDeleteEF)
        .toPromise()
        .then(resp=> { return resp});
      }

      deleteSQL(countDeleteSQL):Promise<any>{
        return this.http.delete(Endpoints.baseURL+'Sql/'+countDeleteSQL)
        .toPromise()
        .then(resp=> { return resp});
      }

      serverFeatures():Promise<any>{
        return this.http.get(Endpoints.baseURL+'ServerInfo')
        .toPromise()
        .then(resp=> {return resp});
      }

}
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class Service {

    constructor(
        private http: Http
      ) { }


      ReqestLinq():Promise<any>{
        return this.http.get('http://localhost:51909/Linq')
        .toPromise()
        .then(resp=> {return resp});
      }

      ReqestSql():Promise<any>{
        return this.http.get('http://localhost:51909/Sql')
        .toPromise()
        .then(resp=> {return resp});
      }

      Fill(countRecords):Promise<any>{
        return this.http.get('http://localhost:51909/Linq/'+countRecords)
        .toPromise()
        .then(resp=> {return resp});
      }

      ClearHistory():void{
        this.http.delete('http://localhost:51909/History')
        .toPromise()
        .then(resp=> { return resp});
      }

      ClearEF():Promise<any>{
        return this.http.delete('http://localhost:51909/Linq')
        .toPromise()
        .then(resp=> { return resp});
      }
      Get():Promise<any>{
        return this.http.get('http://localhost:51909/History')
        .toPromise()
        .then(resp=> { return resp});
      }

      Clearsql():Promise<any>{
        return this.http.delete('http://localhost:51909/Sql')
        .toPromise()
        .then(resp=> { return resp});
      }

      DeleteEF(countDeleteEF):Promise<any>{
        return this.http.delete('http://localhost:51909/Linq/'+countDeleteEF)
        .toPromise()
        .then(resp=> { return resp});
      }

      DeleteSQL(countDeleteSQL):Promise<any>{
        return this.http.delete('http://localhost:51909/Sql/'+countDeleteSQL)
        .toPromise()
        .then(resp=> { return resp});
      }

}
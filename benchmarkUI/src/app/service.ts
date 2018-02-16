import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class Service {

    constructor(
        private http: Http
      ) { }


      SelectEF():Promise<any>{
        return this.http.get('http://localhost:51909/EF')
        .toPromise()
        .then(resp=> {return resp});
      }

      SelectSql():Promise<any>{
        return this.http.get('http://localhost:51909/Sql')
        .toPromise()
        .then(resp=> {return resp});
      }

      Fill(recordsCount):Promise<any>{
        return this.http.post('http://localhost:51909/EF',recordsCount,{headers:new Headers({
          'Content-Type': 'application/json charset=utf-8'})})
        .toPromise()
        .then(resp=> {return resp});
      }

      ClearHistory():void{
        this.http.delete('http://localhost:51909/History')
        .toPromise()
        .then(resp=> { return resp});
      }

      FlushEF():Promise<any>{
        return this.http.delete('http://localhost:51909/EF/Flush')
        .toPromise()
        .then(resp=> { return resp});
      }
      Get():Promise<any>{
        return this.http.get('http://localhost:51909/History')
        .toPromise()
        .then(resp=> { return resp});
      }

      Flushsql():Promise<any>{
        return this.http.delete('http://localhost:51909/Sql/Flush')
        .toPromise()
        .then(resp=> { return resp});
      }

      DeleteEF(countDeleteEF):Promise<any>{
        return this.http.delete('http://localhost:51909/EF/'+countDeleteEF)
        .toPromise()
        .then(resp=> { return resp});
      }

      DeleteSQL(countDeleteSQL):Promise<any>{
        return this.http.delete('http://localhost:51909/Sql/'+countDeleteSQL)
        .toPromise()
        .then(resp=> { return resp});
      }

      serverFeatures():Promise<any>{
        return this.http.get('http://localhost:51909/Session')
        .toPromise()
        .then(resp=> {return resp});
      }

}
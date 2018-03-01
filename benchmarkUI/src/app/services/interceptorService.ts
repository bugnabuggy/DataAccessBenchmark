import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SiteDataService } from '../services/siteDataService'

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class InterceptService implements HttpInterceptor {

constructor(
    private siteDataService :SiteDataService 
){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
          debugger
        this.siteDataService.isSpinnerVisible=true;
        
        return next.handle(req).do((ev: HttpEvent<any>) => 
        {
            debugger
            if (ev instanceof HttpResponse) {
                this.siteDataService.isSpinnerVisible= false ; }
            
          })
          .catch((response) => {
            debugger
            this.siteDataService.isSpinnerVisible= false;
            return Observable.throw(response);
         });
    
}
}
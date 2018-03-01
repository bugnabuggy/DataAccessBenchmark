import { QuerysOperationService } from './querysOperationService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuerysOperationServiceEF extends QuerysOperationService {
    constructor(
        httpClient:HttpClient
    ){
        super("EF", httpClient);
    }
}
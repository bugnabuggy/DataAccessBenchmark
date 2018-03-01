import { QuerysOperationService } from './querysOperationService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuerysOperationServiceSQL extends QuerysOperationService {
    constructor(
        httpClient:HttpClient
    ){
        super("SQL", httpClient);
    }
}
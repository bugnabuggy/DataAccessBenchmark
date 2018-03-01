import { IQueriesOperationService } from "./IQueriesOperationService";
import { Endpoints } from '../models/endpoints'


export class QueriesOperationService implements IQueriesOperationService {
    constructor(
        private type: string,
        private httpClient: any
    ) { }
    select(): Promise<any> {
        return this.httpClient.get(Endpoints.baseURL + this.type)
            .toPromise()
            .then(resp => { return resp });
    }
    flush(): Promise<any> {
        return this.httpClient.delete(Endpoints.baseURL + this.type + '/Flush')
            .toPromise()
            .then(resp => { return resp });;
    }
    delete(numberOfRecordsToDelete: number): Promise<any> {
        return this.httpClient.delete(Endpoints.baseURL + this.type + "/" + numberOfRecordsToDelete)
            .toPromise()
            .then(resp => { return resp });
    }
}


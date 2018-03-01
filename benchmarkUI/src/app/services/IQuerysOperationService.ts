export interface IQuerysOperationService {

    select():Promise<any> ;    
    flush():Promise<any>;
    delete(numberOfRecordsToDelete: number):Promise<any>;
}
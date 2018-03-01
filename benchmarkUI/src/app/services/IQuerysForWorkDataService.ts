
export interface IQuerysForWorkDataService {

      fill(recordsCount):Promise<any>;
      clearHistory():void;
      getRecordsForHistory():Promise<any>;
      serverFeatures():Promise<any>;

}
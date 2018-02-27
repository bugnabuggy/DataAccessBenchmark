import { Component, OnInit, ViewChild } from '@angular/core';
import { HTTPService } from '../services/httpService';
import { ChartService} from '../services/chartService';
import { TestsHistory } from '../models/testsHistory'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TestRecord} from '../models/testRecord'
import { OperationType } from '../models/operationType'

@Component({
  selector: 'app-history',
  templateUrl: '../templates/history.component.html',
  styleUrls: ['../styles/app.component.css']
})


export class HistoryComponent implements OnInit {
  isSpinner: boolean = false;
  private testsHistory = TestsHistory;
  operationType = OperationType;
  filteredOperations:any;
  publicTypeName:string;
  displayedColumnsHistory = [
    'Id',
    'Count',
    'OperationType',
    'ExecutionTime'
  ];
  id = 1;

  dataSourceHistory = new MatTableDataSource<TestRecord>(this.testsHistory);
  @ViewChild(MatPaginator) paginatorHistory: MatPaginator;

  constructor(
    private httpService: HTTPService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.isSpinner = true;
    this.httpService.getRecordsForHistory().then(records => {
      let recordsArray = JSON.parse(records._body);
      this.testsHistory = [];
      for (let index in recordsArray) {
        let record = recordsArray[index]
        this.testsHistory.unshift({ Id: "" + this.id++, Count: record.count, OperationType: record.operationType, ExecutionTime: record.executionTime });
      };
      this.dataSourceHistory.data = this.testsHistory;
      this.isSpinner = false;
    }).catch(error=>{
      alert("the server is not available")
    this.isSpinner = false;});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceHistory.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSourceHistory.paginator = this.paginatorHistory;

  }
  drawingGraphOperations(typeName: string){
    this.filteredOperations = [];
    var data= this.chartService.sampleDataOnTransactions(this.testsHistory, typeName,0);
    this.publicTypeName=typeName;
    this.filteredOperations= this.chartService.getlistsCounts(this.testsHistory, typeName);
    this.chartService.drawingGraphCount(data);
    this.chartService.isCreateChart();
    this.chartService.getChart(data);
  }

  drawingGraphCount(count: number) {
    var data = this.chartService.sampleDataOnTransactions(this.testsHistory,this.publicTypeName,count)
    this.chartService.drawingGraphID(data);
    this.chartService.isCreateChart();
    this.chartService.getChart(data);
  }


  clearHistory() {
    this.httpService.clearHistory();
    location.reload()
  }

}

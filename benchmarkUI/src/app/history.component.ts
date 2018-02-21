import { Component, OnInit, ViewChild } from '@angular/core';
import { HTTPService } from './httpService';
import { ChartService} from './chartService';
import { HistoryTests } from './historyTests'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RecordTestForHistory } from './recordTestForHistory'
import { OperationType } from './operationType'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./app.component.css']
})


export class HistoryComponent implements OnInit {
  private historyTests = HistoryTests;
  operationType = OperationType;
  filteredOperations:any;
  publicTypeName:string;
  constructor(
    private httpService: HTTPService,
    private chartService: ChartService
  ) { }

  displayedColumnsHistory = [
    'Id',
    'Count',
    'OperationType',
    'ExecutionTime'
  ];
  id = 1;



  dataSourceHistory = new MatTableDataSource<RecordTestForHistory>(this.historyTests);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    debugger
    this.dataSourceHistory.filter = filterValue;
  }


  @ViewChild(MatPaginator) paginatorHistory: MatPaginator;

  ngOnInit(): void {
    this.httpService.Get().then(records => {
      let recordsArray = JSON.parse(records._body);
      this.historyTests = [];
      for (let index in recordsArray) {
        let record = recordsArray[index]
        this.historyTests.unshift({ Id: "" + this.id++, Count: record.count, OperationType: record.operationType, ExecutionTime: record.executionTime });
      };
      this.dataSourceHistory.data = this.historyTests;
      
    })
  }
  ngAfterViewInit() {
    this.dataSourceHistory.paginator = this.paginatorHistory;

  }
  drawingGraphOperations(typeName: string){
    this.filteredOperations = [];
    var data= this.chartService.sampleDataOnTransactions(this.historyTests, typeName,0);
    this.publicTypeName=typeName;
    this.filteredOperations= this.chartService.getlistsCounts(this.historyTests, typeName);
    this.chartService.drawingGraphCount(data);
    this.chartService.isCreateChart();
    this.chartService.getChart(data);
  }

  drawingGraphCount(count: number) {
    var data = this.chartService.sampleDataOnTransactions(this.historyTests,this.publicTypeName,count)
    this.chartService.drawingGraphID(data);
    this.chartService.isCreateChart();
    this.chartService.getChart(data);
  }


  ClearHistory() {
    this.httpService.ClearHistory();
    location.reload()
  }

}

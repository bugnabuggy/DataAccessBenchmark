import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/dataService'
import { ChartService} from '../services/chartService';
import { TestsHistory } from '../models/testsHistory'
import { MatPaginator, MatTableDataSource} from '@angular/material';
import { TestRecord} from '../models/testRecord'
import { OperationType } from '../models/operationType'
import { SnackBarService } from '../services/snackBarService'

@Component({
  selector: 'app-history',
  templateUrl: '../templates/history.component.html',
  styleUrls: ['../styles/app.component.css']
})


export class HistoryComponent implements OnInit {
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
    private dataService: DataService,
    private chartService: ChartService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    
    this.dataService.getRecordsForHistory().then(records => {
      this.testsHistory = [];
      for (let index in records) {
        let record = records[index]
        this.testsHistory.unshift({ Id: "" + this.id++, Count: record.count, OperationType: record.operationType, ExecutionTime: record.executionTime });
      };
      this.dataSourceHistory.data = this.testsHistory;
    }).catch(error=>{
      this.snackBar.getSnackBar("the server is not available");
    });
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
    this.dataService.clearHistory();
    location.reload()
  }

}

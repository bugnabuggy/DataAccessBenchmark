import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './service';
import { D3_Service } from './d3-service';
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
  private operationType = OperationType;
  private filteredOperations:any;
  constructor(
    private service: Service,
    private d3_service: D3_Service
  ) { }

  displayedColumnsHistory = [
    'Id',
    'Count',
    'OperationType',
    'ExecutionTime'
  ];
  id = 1;

  dataSourceHistory = new MatTableDataSource<RecordTestForHistory>(this.historyTests);

  @ViewChild(MatPaginator) paginatorHistory: MatPaginator;

  ngOnInit(): void {
    this.service.Get().then(records => {
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
  SampleDataOnTransactions(typeName: string){
    var data= this.d3_service.sampleDataOnTransactions(this.historyTests, typeName,0);
    this.filteredOperations= this.d3_service.getlistsCounts(this.historyTests, typeName);
    this.d3_service.drawingGraphCount(data);
    this.d3_service.chart(data);
  }

  SvgDrawingGraph(count: number) {
    var data = this.d3_service.sampleDataOnTransactions(this.historyTests,"",count)
    this.d3_service.drawingGraphID(data);
    this.d3_service.chart(data);
  }


  ClearHistory() {
    this.service.ClearHistory();
    location.reload()
  }

}

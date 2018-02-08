import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './service';
import { D3_Service } from './d3-service';
import { HistoryTests } from './historyTests'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RecordTestForHistory } from './recordTestForHistory'
import { TypeOperation } from './typeOperation'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./app.component.css']
})


export class HistoryComponent implements OnInit {
  private historyTests = HistoryTests;
  private typeOperation = TypeOperation;
  constructor(
    private service: Service,
    private d3_service: D3_Service
  ) { }

  displayedColumnsHistory = [
    'Id',
    'Count',
    'TypeOperation',
    'ExecutionTime'
  ];
  id = 0;

  dataSourceHistory = new MatTableDataSource<RecordTestForHistory>(this.historyTests);

  @ViewChild(MatPaginator) paginatorHistory: MatPaginator;

  ngOnInit(): void {
    this.service.Get().then(records => {
      let recordsArray = JSON.parse(records._body);
      this.historyTests = [];
      for (let index in recordsArray) {
        let record = recordsArray[index]
        this.historyTests.unshift({ Id: "" + this.id++, Count: record.count, TypeOperation: record.typeOperation, ExecutionTime: record.executionTime });
      };
      this.dataSourceHistory.data = this.historyTests;
    })
  }
  ngAfterViewInit() {
    this.dataSourceHistory.paginator = this.paginatorHistory;

  }

  SvgDrawingGraph(typeName: string) {
    var data = this.d3_service.SampleData(this.historyTests, typeName)
    this.d3_service.SvgDrawingGraph(data.filteredSQL);
  }


  ClearHistory() {
    this.service.ClearHistory();
    location.reload()
  }

}

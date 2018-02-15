import { Component, ViewChild } from '@angular/core';
import { Service } from './service';
import { D3_Service } from './d3-service';

import { HistoryTests } from './historyTests'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RecordTestForHistory } from './recordTestForHistory'

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./app.component.css']
})


export class SessionComponent {
  private session = HistoryTests;
  constructor(
    private service: Service,
  ) { }

  displayedColumnsSession = [
     'Id',
    'Count',
    'OperationType',
    'ExecutionTime'];
  id = 1;


  dataSourceSession = new MatTableDataSource<RecordTestForHistory>(this.session);

  @ViewChild(MatPaginator) paginatorSession: MatPaginator;


  ngAfterViewInit() {

    this.dataSourceSession.paginator = this.paginatorSession;

  }

  Fill(countRecords: number) {
    if (countRecords > 0) {
      countRecords;
      this.service.Fill(countRecords).then(time => {
        this.session.unshift({ Id:""+this.id++, Count:countRecords, OperationType: "Fill records", ExecutionTime:time._body});
        this.dataSourceSession.data = this.session
      });
    }
  }

  ClearEF() {
    this.service.ClearEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Flush with EF", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session
    });
  }


  Clearsql() {
    this.service.Clearsql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Flush with SQL", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session
    });
  }

  ReqestSql() {
    this.service.ReqestSql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Select with SQL", ExecutionTime: result.executionTime });
      this.dataSourceSession.data = this.session
    });
  }

  ReqestLinq() {
    this.service.ReqestEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Select with EF", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session
    });
  }

  CountDeleteEF(countDeleteEF) {
    this.service.DeleteEF(countDeleteEF).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Delete with EF", ExecutionTime: result.executionTime});
        this.dataSourceSession.data = this.session
      }
      else {
        debugger
        alert(result.error)
      }
    });
  }

  CountDeleteSQL(countDeleteSQL) {
    this.service.DeleteSQL(countDeleteSQL).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Delete with SQL", ExecutionTime: result.executionTime});
        this.dataSourceSession.data = this.session
      }
      else {
        alert(result.error)
      }
    }
    );
  }
}

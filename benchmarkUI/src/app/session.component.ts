import { Component, ViewChild } from '@angular/core';
import { Service } from './service';
import { D3_Service } from './d3-service';

import { Session } from './session'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RecordTestSession } from './recordTestSession'

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./app.component.css']
})


export class SessionComponent {
  private session = Session;
  constructor(
    private service: Service,
  ) { }

  displayedColumnsSession = [
    'Count',
    'TimeAddEntityFramework',
    'TimeDeleteEntityFramework',
    'TimeDeleteSQL',
    'ComplexQueryTimeEntityFramework',
    'ComplexQueryTimeSql',
    'TimeClearEntityFramework',
    'TimeClearSql'];
  id = 0;


  dataSourceSession = new MatTableDataSource<RecordTestSession>(this.session);

  @ViewChild(MatPaginator) paginatorSession: MatPaginator;
  // @ViewChild(MatPaginator) paginatorHistory: MatPaginator;

  ngAfterViewInit() {
    // this.dataSourceHistory.paginator= this.paginatorHistory; 
    this.dataSourceSession.paginator = this.paginatorSession;

  }

  Fill(countRecords: number) {
    if (countRecords > 0) {
      countRecords;
      this.service.Fill(countRecords).then(time => {
        this.session.unshift({ id: "", Count: countRecords, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: time._body, TimeClearEntityFramework: "", ComplexQueryTimeSql: "", TimeClearSql: "", TimeDeleteEntityFramework: "", TimeDeleteSQL: "" });
        this.dataSourceSession.data = this.session
      });
    }
  }

  ClearEF() {
    this.service.ClearEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: "", TimeClearEntityFramework: result.time, ComplexQueryTimeSql: "", TimeClearSql: "", TimeDeleteEntityFramework: "", TimeDeleteSQL: "" });
      this.dataSourceSession.data = this.session
    });
  }


  Clearsql() {
    this.service.Clearsql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: "", TimeClearEntityFramework: "", ComplexQueryTimeSql: "", TimeClearSql: result.time, TimeDeleteEntityFramework: "", TimeDeleteSQL: "" });
      this.dataSourceSession.data = this.session
    });
  }

  ReqestSql() {
    this.service.ReqestSql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: "", TimeClearEntityFramework: "", ComplexQueryTimeSql: result.time, TimeClearSql: "", TimeDeleteEntityFramework: "", TimeDeleteSQL: "" });
      this.dataSourceSession.data = this.session
    });
  }

  ReqestLinq() {
    this.service.ReqestLinq().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: result.time, TimeAddEntityFramework: "", TimeClearEntityFramework: "", ComplexQueryTimeSql: "", TimeClearSql: "", TimeDeleteEntityFramework: "", TimeDeleteSQL: "" });
      this.dataSourceSession.data = this.session
    });
  }

  CountDeleteEF(countDeleteEF) {
    this.service.DeleteEF(countDeleteEF).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: "", TimeClearEntityFramework: "", ComplexQueryTimeSql: "", TimeClearSql: "", TimeDeleteEntityFramework: result.time, TimeDeleteSQL: "" });
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
        this.session.unshift({ id: "", Count: result.count, ComplexQueryTimeEntityFramework: "", TimeAddEntityFramework: "", TimeClearEntityFramework: "", ComplexQueryTimeSql: "", TimeClearSql: "", TimeDeleteEntityFramework: "", TimeDeleteSQL: result.time });
        this.dataSourceSession.data = this.session
      }
      else {
        alert(result.error)
      }
    }
    );
  }
}

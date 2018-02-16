import { Component, ViewChild,OnInit } from '@angular/core';
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


export class SessionComponent implements OnInit {
  private session = HistoryTests;
  private isSpinner:boolean=false;
  private CPU:string;
  private RAM:string;
  private HDDType:string;
  private HDDModels:string;
  constructor(
    private service: Service,
  ) { }

  ngOnInit(): void {
    this.service.serverFeatures().then(serverFeatures=>{ 
    var result = JSON.parse(serverFeatures._body);
    this.CPU = result.cpu;
    this.RAM = result.ram;
    this.HDDType = result.hddType;
    this.HDDModels = result.hddModels;
    });
  }
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
      this.isSpinner=true;
      this.service.Fill(countRecords).then(time => {
        this.session.unshift({ Id:""+this.id++, Count:countRecords, OperationType: "Fill records", ExecutionTime:time._body});
        this.dataSourceSession.data = this.session;
        this.isSpinner=false;
      });
    }
  }

  FlushEF() {
    this.isSpinner=true;
    this.service.FlushEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Flush with EF", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session;
      this.isSpinner=false;
    });
  }


  FlushSql() {
    this.isSpinner=true;
    this.service.Flushsql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Flush with SQL", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session;
      this.isSpinner=false;
    });
  }

  SelectSql() {
    this.isSpinner=true;
    this.service.SelectSql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Select with SQL", ExecutionTime: result.executionTime });
      this.dataSourceSession.data = this.session;
      this.isSpinner=false;
    });
  }

  SelectEF() {
    this.isSpinner=true;
    this.service.SelectEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Select with EF", ExecutionTime: result.executionTime});
      this.dataSourceSession.data = this.session;
      this.isSpinner=false;
    });
  }

  CountDeleteEF(countDeleteEF) {
    this.isSpinner=true;
    this.service.DeleteEF(countDeleteEF).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Delete with EF", ExecutionTime: result.executionTime});
        this.dataSourceSession.data = this.session;
        this.isSpinner=false;
      }
      else {
        debugger
        alert(result.error)
      }
    });
  }

  CountDeleteSQL(countDeleteSQL) {
    this.isSpinner=true;
    this.service.DeleteSQL(countDeleteSQL).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: ""+ this.id++, Count: result.count, OperationType: "Delete with SQL", ExecutionTime: result.executionTime});
        this.dataSourceSession.data = this.session;
        this.isSpinner=false;
      }
      else {
        alert(result.error)
      }
    }
    );
  }
}

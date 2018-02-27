import { Component, ViewChild, OnInit } from '@angular/core';
import { HTTPService } from '../services/httpService';

import { TestsHistory } from '../models/testsHistory'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TestRecord} from '../models/testRecord'

@Component({
  selector: 'app-session',
  templateUrl: '../templates/session.component.html',
  styleUrls: ['../styles/app.component.css']
})


export class SessionComponent implements OnInit {
  private session = TestsHistory;
  isSpinner: boolean = false;
  CPU: string;
  RAM: string;
  HDDType: string;
  HDDModels: string;
  constructor(
    private httpService: HTTPService,
  ) { }

  ngOnInit(): void {
    this.isSpinner = true;
    this.httpService.serverFeatures().then(serverFeatures => {
      var result = JSON.parse(serverFeatures._body);
      this.CPU = result.cpu;
      this.RAM = result.ram;
      this.HDDType = result.hddType;
      this.HDDModels = result.hddModels;
      this.isSpinner = false
    }).catch(error => {
          alert("the server is not available")
        this.isSpinner = false
    });
    if (this.session.length == 0) {
      this.id = 1;
    }
    else {
      this.id = this.session.length + 1;
    }
  }

  displayedColumnsSession = [
    'Id',
    'Count',
    'OperationType',
    'ExecutionTime'];
  id;


  dataSourceSession = new MatTableDataSource<TestRecord>(this.session);

  @ViewChild(MatPaginator) paginatorSession: MatPaginator;


  ngAfterViewInit() {

    this.dataSourceSession.paginator = this.paginatorSession;

  }

  fill(countRecords: number) {
    if (countRecords > 0) {
      this.isSpinner = true;
      this.httpService.fill(countRecords).then(time => {
        this.session.unshift({ Id: "" + this.id++, Count: countRecords, OperationType: "Fill records", ExecutionTime: time._body });
        this.dataSourceSession.data = this.session;
        this.isSpinner = false;
      }).catch(error => {
        if (error.status == 404){
          alert("wrong address")}
          else{
          alert("the server is not available")}
          this.isSpinner = false;
      });
    }
    else{
      alert("enter the number of entries to add")
    }

  }

  flushEF() {
    this.isSpinner = true;
    this.httpService.flushEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Flush with EF", ExecutionTime: result.executionTime });
      this.dataSourceSession.data = this.session;
      this.isSpinner = false;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
      this.isSpinner = false;
    });
  }


  flushSql() {
    this.isSpinner = true;
    this.httpService.flushsql().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Flush with SQL", ExecutionTime: result.executionTime });
      this.dataSourceSession.data = this.session;
      this.isSpinner = false;
    }).catch(error => {
      if (error.status == 404){
      alert("wrong address")}
      else{
      alert("the server is not available")}
      this.isSpinner = false;
    });
  }

  selectSql() {
    this.isSpinner = true;
    this.httpService.selectSql().then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Select with SQL", ExecutionTime: result.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(result.error)
      }
      this.isSpinner = false;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
      this.isSpinner = false;
    });
  }

  selectEF() {
    this.isSpinner = true;
    this.httpService.selectEF().then(time => {
      let result = JSON.parse(time._body);
      this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Select with EF", ExecutionTime: result.executionTime });
      this.dataSourceSession.data = this.session;
      this.isSpinner = false;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
      this.isSpinner = false;
    });
  }

  countDeleteEF(countDeleteEF) {
    this.isSpinner = true;
    this.httpService.deleteEF(countDeleteEF).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Delete with EF", ExecutionTime: result.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(result.error)
      }
      this.isSpinner = false;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
      this.isSpinner = false;
    });
  }

  countDeleteSQL(countDeleteSQL) {
    this.isSpinner = true;
    this.httpService.deleteSQL(countDeleteSQL).then(time => {
      let result = JSON.parse(time._body);
      if (result.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: result.count, OperationType: "Delete with SQL", ExecutionTime: result.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(result.error)
      }
      this.isSpinner = false;
    }
    ).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
      this.isSpinner = false;
    });
  }
}

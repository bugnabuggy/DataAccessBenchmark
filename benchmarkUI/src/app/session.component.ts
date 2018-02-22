import { Component, ViewChild, OnInit } from '@angular/core';
import { HTTPService } from './httpService';

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


  dataSourceSession = new MatTableDataSource<RecordTestForHistory>(this.session);

  @ViewChild(MatPaginator) paginatorSession: MatPaginator;


  ngAfterViewInit() {

    this.dataSourceSession.paginator = this.paginatorSession;

  }

  Fill(countRecords: number) {
    if (countRecords > 0) {
      this.isSpinner = true;
      this.httpService.Fill(countRecords).then(time => {
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

  FlushEF() {
    this.isSpinner = true;
    this.httpService.FlushEF().then(time => {
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


  FlushSql() {
    this.isSpinner = true;
    this.httpService.Flushsql().then(time => {
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

  SelectSql() {
    this.isSpinner = true;
    this.httpService.SelectSql().then(time => {
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

  SelectEF() {
    this.isSpinner = true;
    this.httpService.SelectEF().then(time => {
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

  CountDeleteEF(countDeleteEF) {
    this.isSpinner = true;
    this.httpService.DeleteEF(countDeleteEF).then(time => {
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

  CountDeleteSQL(countDeleteSQL) {
    this.isSpinner = true;
    this.httpService.DeleteSQL(countDeleteSQL).then(time => {
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

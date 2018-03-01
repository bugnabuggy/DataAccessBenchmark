import { Component, ViewChild, OnInit } from '@angular/core';
import { QuerysOperationServiceEF } from '../services/querysOperationServiceEF';
import { QuerysOperationServiceSQL } from '../services/querysOperationServiceSQL';
import { QuerysForWorkDataService } from '../services/querysForWorkDataService';
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
  CPU: string;
  RAM: string;
  HDDType: string;
  HDDModels: string;
  constructor(
    private operationServiceSQL: QuerysOperationServiceSQL,
    private operationServiceEF: QuerysOperationServiceEF,
    private dataService:QuerysForWorkDataService
  ) { }

  ngOnInit(): void {
    this.dataService.serverFeatures().then(serverFeatures => {
      this.CPU = serverFeatures.cpu;
      this.RAM = serverFeatures.ram;
      this.HDDType = serverFeatures.hddType;
      this.HDDModels = serverFeatures.hddModels;
    }).catch(error => {
          alert("the server is not available")
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
      this.dataService.fill(countRecords).then(time => {
        this.session.unshift({ Id: "" + this.id++, Count: countRecords, OperationType: "Fill records", ExecutionTime: time });
        this.dataSourceSession.data = this.session;
      }).catch(error => {
        if (error.status == 404){
          alert("wrong address")}
          else{
          alert("the server is not available")}
      });
    }
    else{
      alert("enter the number of entries to add")
    }

  }

  selectEF() {
    this.operationServiceEF.select().then(time => {
      this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Select with EF", ExecutionTime: time.executionTime });
      this.dataSourceSession.data = this.session;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
    });
  }

  countDeleteEF(countDeleteEF) {
    this.operationServiceEF.delete(countDeleteEF).then(time => {
      if (time.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Delete with EF", ExecutionTime: time.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(time.error)
      }
    }).catch(error => {
      if (error.status == 404){
        alert("specify the number of records to delete")}
        else{
        alert("the server is not available")}
    });
  }


  flushEF() {
    this.operationServiceEF.flush().then(time => {
      this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Flush with EF", ExecutionTime: time.executionTime });
      this.dataSourceSession.data = this.session;
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
    });
  }

  selectSql() {
    this.operationServiceSQL.select().then(time => {
      if (time.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Select with SQL", ExecutionTime: time.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(time.error)
      }
    }).catch(error => {
      if (error.status == 404){
        alert("wrong address")}
        else{
        alert("the server is not available")}
    });
  }

  countDeleteSQL(countDeleteSQL) {
    this.operationServiceSQL.delete(countDeleteSQL).then(time => {
      if (time.error == null) {
        this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Delete with SQL", ExecutionTime: time.executionTime });
        this.dataSourceSession.data = this.session;
      }
      else {
        alert(time.error)
      }
    }
    ).catch(error => {
      if (error.status == 404){
        alert("specify the number of records to delete")}
        else{
        alert("the server is not available")}
    });
  }
  
  flushSql() {
    this.operationServiceSQL.flush().then(time => {
      this.session.unshift({ Id: "" + this.id++, Count: time.count, OperationType: "Flush with SQL", ExecutionTime: time.executionTime });
      this.dataSourceSession.data = this.session;
    }).catch(error => {
      if (error.status == 404){
      alert("wrong address")}
      else{
      alert("the server is not available")}
    });
  }

}
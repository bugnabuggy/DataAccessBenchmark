using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using benchmark.Functional.Entitys;
using benchmark.Functional.Entitys;
using benchmark.Functional.Models;
using benchmark.Functional.Repositories;
using benchmark.Functional.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace benchmark.Controllers
{
    [Produces("application/json")]
    [Route("Sql")]
    public class SqlController : Controller
    {

        private IRepository<TestHistory> _repositoryHistory;
        private IRepository<Vendor> _repositoryVendor;
        private OperationCRUDSQL _operationCRUDSQL;
        private IServiceFroWorkWithDB _serviceFroWorkWithDB;

        public SqlController(BenchmarkDataContext ctx, IRepository<TestHistory> repositoryHistory, IRepository<Vendor> repositoryVendor, OperationCRUDSQL operationCRUDSQL, IServiceFroWorkWithDB serviceFroWorkWithDB)
        {
            this._serviceFroWorkWithDB = serviceFroWorkWithDB;
            this._operationCRUDSQL = operationCRUDSQL;
            this._repositoryHistory = repositoryHistory;
            this._repositoryVendor = repositoryVendor;
        }
        [HttpGet]
        public RecordResult Get()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var countItem =this._operationCRUDSQL.Select();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() {  Count = countItem, OperationType = "Select with SQL",ExecutionTime = time });
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = countItem
            }; ;
        }

        [HttpDelete]
        public RecordResult Delete()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationCRUDSQL.DeleteAll();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory(){Count = count,OperationType = "Flush with SQL", ExecutionTime = time});
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = count
            };
        }

        [HttpDelete("{countDelete}")]
        public RecordResult Delete(int countDelete)
        {
            var vendor = this._repositoryVendor.GetAll();
            if (vendor.Count() < countDelete)
            {
                return new RecordResult()
                {
                    Error = "the number of records to delete is more than the table",
                    ExecutionTime = "",
                    Count = 0
                };
            }
            var numbersRecords = this._serviceFroWorkWithDB.GetVendorsToDelete(countDelete);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationCRUDSQL.RecordsCountForDelete(numbersRecords);
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() { Count = count, OperationType = "Delete with SQL", ExecutionTime = time });
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = count
            };
        }

    }
}
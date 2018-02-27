using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional;
using benchmark.Functional.Entitys;
using benchmark.Functional.Models;
using benchmark.Functional.Repositories;
using benchmark.Functional.Services;
using Microsoft.AspNetCore.Mvc;

namespace benchmark.Controllers
{
    [Route("EF")]
    public class EFController : Controller
    {

        private IServiceFroWorkWithDB _serviceFroWorkWithDB;
        private IRepository<TestHistory> _repositoryHistory;
        private IRepository<Vendor> _repositoryVendor;
        private OperationCRUDEF _operationCRUDEF;

        public EFController(IServiceFroWorkWithDB serviceFroWorkWithDB, IRepository<TestHistory> repositoryHistory, IRepository<Vendor> repositoryVendor, OperationCRUDEF operationCRUDEF)
        {
            this._serviceFroWorkWithDB = serviceFroWorkWithDB;
            this._repositoryHistory = repositoryHistory;
            this._repositoryVendor = repositoryVendor;
            this._operationCRUDEF = operationCRUDEF;
        }
        [HttpGet]
        public RecordResult Get()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationCRUDEF.Select();
            stopwatch.Stop();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() {  Count = count, OperationType = "Select with EF",ExecutionTime = time });
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = count
            };
        }

        [HttpPost]
        public  JsonResult Post([FromBody]int recordsCount)
        {

            var stopwatch = new Stopwatch();
            stopwatch.Start();
            this._serviceFroWorkWithDB.Fill(recordsCount);
            stopwatch.Stop();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() { Count = recordsCount, OperationType = "Fill records", ExecutionTime = time });
            return Json(time);

        }

        [HttpDelete("/EF/Flush")]
        public RecordResult Flush()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationCRUDEF.DeleteAll();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() {  Count = count, OperationType = "Flush with EF", ExecutionTime = time });
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = count
            };
        }
        [HttpDelete("{countDelete}")]
        public RecordResult Delete(int countDelete)
        {
            var count = 0;
            var vendor = this._repositoryVendor.GetAll();
            if (vendor.Count()<countDelete)
            {
                return new RecordResult()
                {
                    Error = "the number of records to delete is more than the table",
                    ExecutionTime = "",
                    Count = 0
                };
            }
            var Records =this._serviceFroWorkWithDB.GetVendorsToDelete(countDelete);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            try
            {
                count = this._operationCRUDEF.RecordsCountForDelete(Records);
            }
            catch (Exception e)
            {
                return new RecordResult()
                {
                    Error = "Unable to delete record! Retry the request",
                    ExecutionTime = "",
                    Count = 0
                };
            }
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new TestHistory() { Count = count, OperationType = "Delete with EF", ExecutionTime = time });
            return new RecordResult()
            {
                ExecutionTime = time,
                Count = count
            };
        }
    }
}

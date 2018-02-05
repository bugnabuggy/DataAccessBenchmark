using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional;
using benchmark.Functional.Entity;
using benchmark.Functional.Models;
using benchmark.Functional.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace benchmark.Controllers
{
    [Route("Linq")]
    public class LinqController : Microsoft.AspNetCore.Mvc.Controller
    {

        private IOperationWithEntityBd _operationWithEntityBd;
        private IRepository<HistoryTest> _repositoryHistory;
        private IRepository<Vendor> _repositoryVendor;

        public LinqController(IOperationWithEntityBd operationWithEntityBd, IRepository<HistoryTest> repositoryHistory, IRepository<Vendor> repositoryVendor)
        {
            this._operationWithEntityBd = operationWithEntityBd;
            this._repositoryHistory = repositoryHistory;
            this._repositoryVendor = repositoryVendor;
        }
        [HttpGet]
        public RecordResult Get()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationWithEntityBd.Reqest();
            stopwatch.Stop();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() {  Count = count,TypeOperation = "Select with EF",ExecutionTime = time });
            return new RecordResult()
            {
                Time = time,
                Count = count
            };
        }


        [HttpGet("{countRecords}")]
        public string Get(int countRecords)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            this._operationWithEntityBd.Fill(countRecords);
           stopwatch.Stop();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() {  Count = countRecords,TypeOperation = "Fill records",ExecutionTime = time });
            return time;
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

        }

        [HttpDelete]
        public RecordResult Delete()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count =this._operationWithEntityBd.DeleteAll();
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() {  Count = count, TypeOperation = "Flush with EF", ExecutionTime = time });
            return new RecordResult()
            {
                Time = time,
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
                    Time = "",
                    Count = 0
                };
            }
            var numbersRecords =this._operationWithEntityBd.NumberFroDelete(countDelete);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            try
            {
                count = this._operationWithEntityBd.DeleteCountEF(numbersRecords);
            }
            catch (Exception e)
            {
                return new RecordResult()
                {
                    Error = "Unable to delete record! Retry the request",
                    Time = "",
                    Count = 0
                };
            }
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() { Count = count, TypeOperation = "Delete with EF", ExecutionTime = time });
            return new RecordResult()
            {
                Time = time,
                Count = count
            };
        }
    }
}

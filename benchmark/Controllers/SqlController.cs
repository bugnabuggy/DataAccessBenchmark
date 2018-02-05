using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using benchmark.Functional.Entity;
using benchmark.Functional.Models;
using benchmark.Functional.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace benchmark.Controllers
{
    [Produces("application/json")]
    [Route("Sql")]
    public class SqlController : Controller
    {

        private BenchmarkDataContext _ctx;
        private IRepository<HistoryTest> _repositoryHistory;
        private IRepository<Vendor> _repositoryVendor;
        private IOperationWithEntityBd _operationWithEntityBd;

        public SqlController(BenchmarkDataContext ctx, IRepository<HistoryTest> repositoryHistory, IRepository<Vendor> repositoryVendor, IOperationWithEntityBd operationWithEntityBd)
        {
            this._operationWithEntityBd = operationWithEntityBd;
            this._repositoryHistory = repositoryHistory;
            this._ctx = ctx;
            this._repositoryVendor = repositoryVendor;
        }
        [HttpGet]
        public RecordResult Get()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var countItem = 0;
            
                using (var command = this._ctx.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.Text;
                    command.CommandText = "SELECT Vendors.Id ,Vendors.Name, COUNT(DISTINCT p.Id) AS Count_Products " +
                                          "From Vendors " +
                                          "LEFT JOIN Products AS p ON p.VendorId = Vendors.Id " +
                                          "GROUP BY Vendors.Id, Vendors.Name ";
                    this._ctx.Database.OpenConnection();
                    var reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            var data = new object[reader.FieldCount];
                            var count = reader.GetValues(data);
                            countItem++;
                        }
                    }
                    
                }
            
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() {  Count = countItem, TypeOperation = "Select with SQL",ExecutionTime = time });
            return new RecordResult()
            {
                Time = time,
                Count = countItem
            }; ;
        }

        [HttpDelete]
        public RecordResult Delete()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._ctx.Database.ExecuteSqlCommand("DELETE FROM Vendors");
            this._ctx.Database.ExecuteSqlCommand("DELETE FROM WareHouses");
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest(){Count = count,TypeOperation = "Flush with SQL", ExecutionTime = time});
            return new RecordResult()
            {
                Time = time,
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
                    Time = "",
                    Count = 0
                };
            }
            var numbersRecords = this._operationWithEntityBd.NumberFroDelete(countDelete);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var count = this._operationWithEntityBd.DeleteCountSQL(numbersRecords);
            var time = stopwatch.Elapsed.ToString();
            this._repositoryHistory.Add(new HistoryTest() { Count = count, TypeOperation = "Delete with SQL", ExecutionTime = time });
            return new RecordResult()
            {
                Time = time,
                Count = count
            };
        }

    }
}
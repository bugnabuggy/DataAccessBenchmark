using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.Entitys;
using benchmark.Functional.Repositories;
using benchmark.Functional.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace benchmark.Controllers
{
    [Produces("application/json")]
    [Route("HistoryRecordsTest")]
    public class HistoryController : Controller
    {


        private IServiceFroWorkWithDB _serviceFroWorkWithDB;
        private IRepository<TestHistory> _repositoryHistory;

        public HistoryController(IServiceFroWorkWithDB serviceFroWorkWithDB, IRepository<TestHistory> repositoryHistory)
        {
            this._serviceFroWorkWithDB = serviceFroWorkWithDB;
            this._repositoryHistory = repositoryHistory;
        }


        [HttpGet]
        public IEnumerable<TestHistory> Get()
        {
            
            return  this._serviceFroWorkWithDB.GetHistory(); 

        }

        [HttpDelete]
        public void Delete()
        {
            this._repositoryHistory.Delete();
        }
    }
}
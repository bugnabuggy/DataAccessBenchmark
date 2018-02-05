using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DTO;
using benchmark.Functional.Entity;
using benchmark.Functional.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace benchmark.Controllers
{
    [Produces("application/json")]
    [Route("History")]
    public class HistoryController : Controller
    {


        private IOperationWithEntityBd _operationWithEntityBd;
        private IRepository<HistoryTest> _repositoryHistory;

        public HistoryController(IOperationWithEntityBd operationWithEntityBd, IRepository<HistoryTest> repositoryHistory)
        {
            this._operationWithEntityBd = operationWithEntityBd;
            this._repositoryHistory = repositoryHistory;
        }


        [HttpGet]
        public IEnumerable<HistoryTest> Get()
        {
            
            return  this._operationWithEntityBd.GetHistory(); 

        }

        [HttpDelete]
        public void Delete()
        {
            this._repositoryHistory.Delete();
        }
    }
}
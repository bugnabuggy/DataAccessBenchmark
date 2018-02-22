using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Management;
using benchmark.Functional.Services;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ServerFeatures = benchmark.Functional.Models.ServerFeatures;

namespace benchmark.Controllers
{
  [Route("ServerInfo")]
  public class SessionController : Controller
  {
    private IServerFeatures _serverFeatures;
    public SessionController(IServerFeatures serverFeatures)
    {
      this._serverFeatures = serverFeatures;
    }


    [HttpGet]
    public ServerFeatures Get()
    {
      var items = this._serverFeatures.GetHDDTypeAndModel();
      var typeAndModels = items.Split(':');
      ServerFeatures result= new ServerFeatures()
      {
        CPU = this._serverFeatures.GetCPUName(),
        RAM = this._serverFeatures.GetRAMCount(),
        HDDType = typeAndModels[0],
        HDDModels = typeAndModels[1]
    };

      return result;
    }
  }
}
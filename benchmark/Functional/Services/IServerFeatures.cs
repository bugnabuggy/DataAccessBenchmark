using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Services
{
    public interface IServerFeatures
    {
      string GetCPUName();
      double GetRAMCount();
      string GetHDDTypeAndModel();
    }
}

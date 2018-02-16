using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.Entitys;

namespace benchmark.Functional.Services
{
    public interface IServiceFroWorkWithDB
    {
        void Fill(int countRecords);
        IEnumerable<TestHistory> GetHistory();
        IEnumerable<Vendor> GetVendorsToDelete(int count);
    }
}

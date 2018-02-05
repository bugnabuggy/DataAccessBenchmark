using benchmark.Functional.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using benchmark.Functional.Entity;

namespace benchmark.Functional.Repositories
{
    public interface IOperationWithEntityBd
    {
        void Fill(int countRecords);
        int DeleteAll();
        int Reqest();
        IEnumerable<HistoryTest> GetHistory();
        int DeleteCountSQL(IEnumerable<Vendor> numberRecords);
        int DeleteCountEF(IEnumerable<Vendor> numberRecords);
        IEnumerable<Vendor> NumberFroDelete(int count);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using benchmark.Functional.Entitys;

namespace benchmark.Functional.Services
{
    public interface IOperationCRUD
    {
        
        int DeleteAll();
        int Select();
        int RecordsCountForDelete(IEnumerable<Vendor> Records);

        
    }
}

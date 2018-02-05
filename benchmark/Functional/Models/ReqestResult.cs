using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Models
{
    public class ReqestResult
    {
        public Guid Id_Vendor { get; set; }
        public string Name_vendor { get; set; }
        public int Count_products { get; set; }
        public int Count_WareHouse { get; set; }
    }
}

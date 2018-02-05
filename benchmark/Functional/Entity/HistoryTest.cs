using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Entity
{
    public class HistoryTest
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public string TypeOperation { get; set; }
        public string ExecutionTime { get; set; }
    }
}

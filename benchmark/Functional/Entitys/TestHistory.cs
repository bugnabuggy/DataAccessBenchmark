using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Entitys
{
    public class TestHistory
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public string OperationType { get; set; }
        public string ExecutionTime { get; set; }
    }
}

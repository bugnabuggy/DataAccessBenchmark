using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;

namespace benchmark.Functional.Models
{
    public class RecordResult
    {
        public string Error { get; set; }
        public string Time { get; set; }
        public int Count { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.Entitys;
using Newtonsoft.Json.Serialization;

namespace benchmark.Functional.Models
{
    public class RecordResult:TestHistory
    {
        public string Error { get; set; }

    }
}

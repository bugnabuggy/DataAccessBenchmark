using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.DTO
{
    public class HistoryDTO
    {
        public int Count { get; set; }
        public string TimeAddEntityFramework { get; set; }
        public string TimeClearEntityFramework { get; set; }
        public string TimeClearSql { get; set; }
        public string TimeDeleteEntityFramework { get; set; }
        public string TimeDeleteSQL { get; set; }
        public string ComplexQueryTimeEntityFramework { get; set; }
        public string ComplexQueryTimeSql { get; set; }

    }
}

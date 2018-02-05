using benchmark.Functional.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Models
{
    public class DictionaryOperations
    {
        public Dictionary<string, HistoryDTO> DictionaryType { get; set; }

        public DictionaryOperations()
        {
            DictionaryType = new Dictionary<string, HistoryDTO> {
            {"Select with EF", new HistoryDTO()
                    {
                        Count = 0,
                        ComplexQueryTimeEntityFramework = ""
                    }},
            {"Flush with EF", new HistoryDTO()
                    {
                        Count = 0,
                        TimeClearEntityFramework= ""
                    } },
            {"Fill records", new HistoryDTO()
                    {
                        Count = 0,
                        TimeAddEntityFramework = ""
                    }},
            {"Flush with SQL",new HistoryDTO()
                    {
                        Count = 0,
                        TimeClearSql = ""
                    }  },
            {"Select with SQL", new HistoryDTO()
                    {
                        Count = 0,
                        ComplexQueryTimeSql = ""
                    } },
            {"Delete with EF", new HistoryDTO()
                    {
                        Count = 0,
                        TimeDeleteEntityFramework = ""
                    } },
            {"Delete with SQL", new HistoryDTO()
                    {
                        Count = 0,
                        TimeDeleteSQL = ""
                    } }
            };
        }
    }
}

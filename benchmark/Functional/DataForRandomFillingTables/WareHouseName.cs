using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.DataForRandomFillingTables
{
    public class WareHouseName
    {
        public string[] WareHouseNameList { get; set; }

       public WareHouseName()
        {
            WareHouseNameList = new[]
            {
                "Склад общего пользования", "склад класса А", "склад класса B", "склад класса C", "склад класса D", "склад класса F","склад класса G"
            };
        }
    }
}

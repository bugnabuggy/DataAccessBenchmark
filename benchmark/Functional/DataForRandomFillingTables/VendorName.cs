using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.DataForRandomFillingTables
{
    public class VendorName
    {
        public string[] VendorNameList { get; set; }

        public VendorName()
        {
            VendorNameList = new[]
                {"Абсолют - Сервис", " АвтоСибирь", " АТМАШ ", "Веритас", "Волжский круиз", "Восточный край","Геллион ","Гидросим", "Гросконсалт",  "Автоброкер Онлайн.ру","Омские Вездеходы",
                    "ABEX", "АВТОБЭСТ",  "ОмскТрансМаш","ABI ", "АвтоВл","ОНЕЖЕЦ","ACE","АвтоВладКар","ООО Гаврилов и ГК","a-foton.ru","АвтоВладКар-Москва","ООО Абсолют-М"};
        }
    }
}

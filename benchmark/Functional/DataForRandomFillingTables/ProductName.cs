using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.DataForRandomFillingTables
{
    public  class ProductName
    {
        public  string[] ProductNameList { get;set; }

       public ProductName()
        {
            ProductNameList = new[]
            {
                "Макароны ", "Грудка куриная", "  Греча", "Зуб.паста",
                "Индейка", "Панир.сухари", "Очиститель пос.мойки",
                "Фарш", "Сахар", "Доместос",
                "Рис", "Пемолюкс", "Соль", "Спички",
                "Лимон"," Фасоль"," Мешки мусор большие",
                "Яблоки" , "Горох"," Мешки мусор маленькие"
            };
        }
    }
}

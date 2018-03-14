using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using benchmark.Functional.Entitys;
using Microsoft.EntityFrameworkCore;

namespace benchmark.Functional.Services
{
    public class OperationCRUDSQL: IOperationCRUD
    {
        private BenchmarkDataContext _ctx;

        public OperationCRUDSQL( BenchmarkDataContext ctx)
        {
            this._ctx = ctx;

        }

        public int DeleteAll()
        {
            var count = this._ctx.Database.ExecuteSqlCommand("DELETE FROM Vendors");
            this._ctx.Database.ExecuteSqlCommand("DELETE FROM WareHouses");
            return count;
        }

        public int Select()
        {
            var countItem = 0;

            using (var command = this._ctx.Database.GetDbConnection().CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT Vendors.Id ,Vendors.Name, COUNT(DISTINCT p.Id) AS Count_Products " +
                                      "From Vendors " +
                                      "LEFT JOIN Products AS p ON p.VendorId = Vendors.Id " +
                                      "GROUP BY Vendors.Id, Vendors.Name ";
                this._ctx.Database.OpenConnection();
              using (var reader = command.ExecuteReader())
              {
                
                if (reader.HasRows)
                {
                  while (reader.Read())
                  {
                    var data = new object[reader.FieldCount];
                    reader.GetValues(data);
                    countItem++;
                  }
                }

        }

            }
            return countItem;
        }

        public int RecordsCountForDelete(IEnumerable<Vendor> Records)
        {
            foreach (var Record in Records)
            {
                var item = Record.Id.ToString();
                this._ctx.Database.ExecuteSqlCommand("DELETE FROM Vendors WHERE Vendors.Id = '" + item + "'");
            }
            return Records.Count();
        }
    }
}

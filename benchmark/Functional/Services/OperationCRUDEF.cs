using System;
using System.Collections.Generic;
using System.Linq;
using benchmark.Functional.DataContext;
using benchmark.Functional.Entitys;
using benchmark.Functional.Repositories;




namespace benchmark.Functional.Services
{
    public class OperationCRUDEF : IOperationCRUD
    {
        private IRepository<Vendor> _vendor;
        private IRepository<WareHouse> _wareHouse;
        private BenchmarkDataContext _ctx;

        public OperationCRUDEF(IRepository<Vendor> vendor, IRepository<WareHouse> wareHouse, BenchmarkDataContext ctx)
        {
            this._ctx = ctx;
            this._vendor = vendor;
            this._wareHouse = wareHouse;

        }
     
        public int DeleteAll()
        {
            var count= _vendor.Delete();
            _wareHouse.Delete();
            return count;
        }

        public int Select()
        {
            var result = _ctx.Vendors.GroupJoin(_ctx.Products,
                v => v.Id,
                p => p.VendorId,
                (v, p) =>  new 
                {
                    Id_Vendor = v.Id,
                    Name_vendor = v.Name,
                    Count_products = p.Count(), 
                }
            );
            return result.Count();
        }

        public int RecordsCountForDelete(IEnumerable<Vendor> Records)
        {
            foreach (var Record in Records)
            {
                this._vendor.Delete(Record);
            }
            return Records.Count();
        }

    }
}

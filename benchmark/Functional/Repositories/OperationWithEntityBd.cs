using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using benchmark.Functional.DataForRandomFillingTables;
using benchmark.Functional.DTO;
using benchmark.Functional.Entity;
using benchmark.Functional.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;


namespace benchmark.Functional.Repositories
{
    public class OperationWithEntityBd : IOperationWithEntityBd
    {
        private IRepository<Vendor> _vendor;
        private IRepository<WareHouse> _wareHouse;
        private IRepository<Product> _product;
        private IRepository<ProducteInWareHouse> _producteInWareHouse;
        private IRepository<HistoryTest> _repositoryHistory;
        private BenchmarkDataContext _ctx;

        public OperationWithEntityBd(IRepository<Vendor> vendor, IRepository<WareHouse> wareHouse, IRepository<Product> product, IRepository<ProducteInWareHouse> producteInWareHouse, BenchmarkDataContext ctx, IRepository<HistoryTest> repositoryHistory)
        {
            this._ctx = ctx;
            this._vendor = vendor;
            this._wareHouse = wareHouse;
            this._product = product;
            this._producteInWareHouse = producteInWareHouse;
            this._repositoryHistory = repositoryHistory;
        }
        public void Fill(int countRecords)
        {
            var vendorList = FillVendor(countRecords);
            var warehouseList = FillWareHouse(countRecords);
            var productList = FillProduct(vendorList, countRecords);
            FillProductInWeraHouse(productList, warehouseList, countRecords);
        }

        public List<Vendor> FillVendor(int countRecords)
        {
            var random = new Random();

            var VendorNameList = new VendorName();
            List<Vendor> vendors = new List<Vendor>();
            for (int i = 0; i < countRecords; i++)
            {
                var name = random.Next(VendorNameList.VendorNameList.Length - 1);
                vendors.Add(new Vendor()
                {
                    Id = Guid.NewGuid(),
                    Name = VendorNameList.VendorNameList[name]
                }
                    );
            }
            _vendor.Add(vendors);
            return vendors;
        }

        public List<WareHouse> FillWareHouse(int countRecords)
        {
            var random = new Random();

            var WareHouseNameList = new WareHouseName();
            List<WareHouse> WareHouses = new List<WareHouse>();
            for (int i = 0; i < countRecords; i++)
            {
                var name = random.Next(WareHouseNameList.WareHouseNameList.Length - 1);
                WareHouses.Add(new WareHouse()
                {
                    id = Guid.NewGuid(),
                    name = WareHouseNameList.WareHouseNameList[name],
                    Locatoin = "local"
                }
                );
            }
            _wareHouse.Add(WareHouses);
            return WareHouses;
        }

        public List<Product> FillProduct(List<Vendor> vendorList, int countRecords)
        {
            var random = new Random();

            var productNameList = new ProductName();
            List<Product> product = new List<Product>();
            for (int i = 0; i < countRecords; i++)
            {
                var name = random.Next(productNameList.ProductNameList.Length - 1);
                var vendorId = random.Next(countRecords - 1);
                var cost = random.Next(5000);
                product.Add(new Product()
                {
                    Id = Guid.NewGuid(),
                    ProductName = productNameList.ProductNameList[name],
                    VendorId = vendorList[vendorId].Id,
                    cost = cost
                }
                );
            }
            _product.Add(product);
            return product;

        }

        public void FillProductInWeraHouse(List<Product> productList, List<WareHouse> warehouseList, int countRecords)
        {
            var random = new Random();

            List<ProducteInWareHouse> producteInWareHouse = new List<ProducteInWareHouse>();
            for (int i = 0; i < countRecords; i++)
            {
                var warehouseId = random.Next(countRecords - 1);
                var productId = random.Next(countRecords - 1);
                var cost = random.Next(300);
                producteInWareHouse.Add(new ProducteInWareHouse()
                {
                    ProductId = productList[productId].Id,
                    WareHouseId = warehouseList[warehouseId].id,
                    Count = cost
                }
                );
            }
            _producteInWareHouse.Add(producteInWareHouse);
        }
        public int DeleteAll()
        {
            var count= _vendor.Delete();
            _wareHouse.Delete();
            //_product.Delete();
            //_producteInWareHouse.Delete();
            return count;
        }

        public int Reqest()
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

        public IEnumerable<HistoryTest> GetHistory()
        {
            List<HistoryTest> records = this._repositoryHistory.GetAll().ToList();
            //var dictionaryType = new DictionaryOperations();
            //var record = new HistoryDTO();
            //foreach (var recordBdHistory in this._repositoryHistory.GetAll() )
            //{
            //    record = dictionaryType.DictionaryType[recordBdHistory.TypeOperation];
            //    record.Count = recordBdHistory.Count;
            //    if (record.ComplexQueryTimeEntityFramework!=null)
            //    {
            //        record.ComplexQueryTimeEntityFramework = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.ComplexQueryTimeSql != null)
            //    {
            //        record.ComplexQueryTimeSql = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.TimeAddEntityFramework != null)
            //    {
            //        record.TimeAddEntityFramework = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.TimeClearEntityFramework != null)
            //    {
            //        record.TimeClearEntityFramework = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.TimeClearSql != null)
            //    {
            //        record.TimeClearSql = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.TimeDeleteEntityFramework != null)
            //    {
            //        record.TimeDeleteEntityFramework = recordBdHistory.ExecutionTime;
            //    }
            //    if (record.TimeDeleteSQL != null)
            //    {
            //        record.TimeDeleteSQL = recordBdHistory.ExecutionTime;
            //    }
            //    records.Add(record);
            //}
            return records;
        }

        public int DeleteCountSQL(IEnumerable<Vendor> numberRecords)
        {
            foreach (var numberRecord in numberRecords)
            {
                var item = numberRecord.Id.ToString();
                this._ctx.Database.ExecuteSqlCommand("DELETE FROM Vendors WHERE Vendors.Id = '" + item+"'");
            }
            return numberRecords.Count();
        }

        public int DeleteCountEF(IEnumerable<Vendor> numberRecords)
        {
            foreach (var numberRecord in numberRecords)
            {
                this._vendor.Delete(numberRecord);
            }
            return numberRecords.Count();
        }

        public IEnumerable<Vendor> NumberFroDelete(int count)
        {
            List<Vendor> numberFroDelete = new List<Vendor>();
            var vendor= this._vendor.GetAll().ToList();
            var step = (vendor.Count() / count);
            var item = new Vendor();
            for (int i = 0; i < vendor.Count(); i+=step)
            {
                item = vendor[i];
                numberFroDelete.Add(item);
                if (numberFroDelete.Count.Equals(count))
                    break;
            }
            return numberFroDelete;
        }
    }
}

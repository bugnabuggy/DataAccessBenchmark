using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DataForRandomFillingTables;
using benchmark.Functional.Entitys;
using benchmark.Functional.Repositories;

namespace benchmark.Functional.Services
{
    public class ServiceFroWorkWithDB:IServiceFroWorkWithDB
    {
        private IRepository<Vendor> _vendor;
        private IRepository<WareHouse> _wareHouse;
        private IRepository<Product> _product;
        private IRepository<ProducteInWareHouse> _producteInWareHouse;
        private IRepository<TestHistory> _repositoryHistory;

        public ServiceFroWorkWithDB(IRepository<Vendor> vendor, IRepository<WareHouse> wareHouse, IRepository<Product> product, IRepository<ProducteInWareHouse> producteInWareHouse, IRepository<TestHistory> repositoryHistory)
        {
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
                    Id = Guid.NewGuid(),
                    Name = WareHouseNameList.WareHouseNameList[name],
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
            List<Product> products = new List<Product>();
            for (int i = 0; i < countRecords; i++)
            {
                var name = random.Next(productNameList.ProductNameList.Length - 1);
                var vendorId = random.Next(countRecords - 1);
                var cost = random.Next(5000);
                products.Add(new Product()
                {
                    Id = Guid.NewGuid(),
                    ProductName = productNameList.ProductNameList[name],
                    VendorId = vendorList[vendorId].Id,
                    Cost = cost
                }
                );
            }
            _product.Add(products);
            return products;

        }

        public void FillProductInWeraHouse(List<Product> productList, List<WareHouse> warehouseList, int countRecords)
        {
            var random = new Random();

            List<ProducteInWareHouse> producteInWareHouses = new List<ProducteInWareHouse>();
            for (int i = 0; i < countRecords; i++)
            {
                var warehouseId = random.Next(countRecords - 1);
                var productId = random.Next(countRecords - 1);
                var cost = random.Next(300);
                producteInWareHouses.Add(new ProducteInWareHouse()
                {
                    ProductId = productList[productId].Id,
                    WareHouseId = warehouseList[warehouseId].Id,
                    Count = cost
                }
                );
            }
            _producteInWareHouse.Add(producteInWareHouses);
        }

        public IEnumerable<TestHistory> GetHistory()
        {
            List<TestHistory> records = this._repositoryHistory.GetAll().ToList();
            return records;
        }

        public IEnumerable<Vendor> GetVendorsToDelete(int count)
        {
            List<Vendor> vendorsToDelete = new List<Vendor>();
            var vendors = this._vendor.GetAll().ToList();
            var step = (vendors.Count / count);
            var item = new Vendor();
            for (int i = 0; i < vendors.Count; i += step)
            {
                item = vendors[i];
                vendorsToDelete.Add(item);
                if (vendorsToDelete.Count.Equals(count))
                    break;
            }
            return vendorsToDelete;
        }
    }
}

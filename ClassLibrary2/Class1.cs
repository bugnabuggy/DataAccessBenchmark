using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using benchmark.Functional.Entity;
using benchmark.Functional.Repositories;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Internal;

namespace ClassLibrary2
{
    [TestFixture]
    public class Class1
    {
        private Mock<IRepository<Vendor>> _vendorRepoMock;
        private Mock<IRepository<Product>> _productRepoMock;


        [Test]
        public void AddRecord()
        {
            this._vendorRepoMock= new Mock<IRepository<Vendor>>();
            
            var idVendor = Guid.NewGuid();
            Vendor vendor = new Vendor
            {
                Id = idVendor,
                Name = "1234"
            };
            this._vendorRepoMock.Setup(x => x.Add(vendor)).Returns(vendor);
            var idProduct= Guid.NewGuid();
            Product product = new Product()
            {
                 Id = idProduct,
                 VendorId = idVendor,
                 ProductName = "qwerty",
                 cost = 123
                 
            };
            this._productRepoMock= new Mock<IRepository<Product>>();
            this._productRepoMock.Setup(x => x.Add(product)).Returns(product);

            
        }
    }
}

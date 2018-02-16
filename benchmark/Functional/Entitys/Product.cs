using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Entitys
{
    public class Product
    {
      public Guid Id { get; set; }
      public string ProductName { get; set; }
      public int Cost { get; set; }

      public Guid VendorId { get; set; }
      [ForeignKey("VendorId")]
      public Vendor Vendor { get; set; }
    }
}

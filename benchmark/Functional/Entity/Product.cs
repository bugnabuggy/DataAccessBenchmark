using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace benchmark.Functional.Entity
{
    public class Product
    {
      public Guid Id { get; set; }
      public string ProductName { get; set; }
      public int cost { get; set; }

      public Guid VendorId { get; set; }
      [ForeignKey("VendorId")]
      public Vendor Vendor { get; set; }
    }
}

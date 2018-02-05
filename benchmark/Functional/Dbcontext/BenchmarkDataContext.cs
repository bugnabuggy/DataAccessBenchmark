using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using benchmark.Functional.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace benchmark.Functional.DataContext
{
    public class BenchmarkDataContext : DbContext
    {
        public BenchmarkDataContext(DbContextOptions<BenchmarkDataContext> options)
            : base(options)
        {
        }

        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<WareHouse> WareHouses { get; set; }
        public DbSet<ProducteInWareHouse> ProducteInWareHouses { get; set; }
        public DbSet<HistoryTest> HistoryTests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder
            //    .Entity<Product>()
            //    .HasOne(x => x.Vendor)
            //    .WithOne()
               
            //    .OnDelete(DeleteBehavior.Restrict);

        }
    }
}

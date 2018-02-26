using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace benchmark.Functional.Dbcontext
{
    public class BenchmarkDataContextFactory:IDesignTimeDbContextFactory<BenchmarkDataContext>
  {
    public BenchmarkDataContext CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<BenchmarkDataContext>();
      optionsBuilder.UseSqlServer("Server=developer1;Database=benchmark;Trusted_Connection=True;MultipleActiveResultSets=true");

      return new BenchmarkDataContext(optionsBuilder.Options);
    }
  }
}

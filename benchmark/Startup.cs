using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using benchmark.Functional;
using benchmark.Functional.DataContext;
using benchmark.Functional.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;


namespace benchmark
{
    public class Startup
    {
        private AppConfigurator appConfigurator = new AppConfigurator();
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BenchmarkDataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ReleaseConnection")));
            services.AddMvc();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
            appConfigurator.ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            app.UseStaticFiles();

            app.UseDeveloperExceptionPage();
            
            appConfigurator.UseMvcAndConfigureRoutes(app);

            app.UseAuthentication();
    }
    }
}

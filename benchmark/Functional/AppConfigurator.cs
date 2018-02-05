using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using benchmark.Functional.Entity;
using benchmark.Functional.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.Extensions.DependencyInjection;





namespace benchmark.Functional
{
    public class AppConfigurator //have to make it public because want to test it
    {
        internal void UseMvcAndConfigureRoutes(IApplicationBuilder app)
        {
            app.UseCors("AllowSpecificOrigin");

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=N2N}/{action=Index}/{id?}");
            });
        }
    

        /// <summary>
        /// Wire up dependecy injection
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IRepository<Vendor>, DbRepository<Vendor>>();
            services.AddTransient<IRepository<Product>, DbRepository<Product>>();
            services.AddTransient<IRepository<WareHouse>, DbRepository<WareHouse>>();
            services.AddTransient<IRepository<ProducteInWareHouse>, DbRepository<ProducteInWareHouse>>();
            services.AddTransient<IRepository<HistoryTest>, DbRepository<HistoryTest>>();

            services.AddTransient< IOperationWithEntityBd, OperationWithEntityBd >();

            
        }
    }
}

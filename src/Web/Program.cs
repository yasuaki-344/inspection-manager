using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Reflection;
using System.Text;
using InspectionManager.ApplicationCore.Interfaces;
using InspectionManager.ApplicationCore.Services;
using InspectionManager.Infrastructure;
using InspectionManager.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddControllersWithViews();

    // Auto mapping setting
    builder.Services.AddAutoMapper(cfg => { cfg.AddProfile<AutoMapping>(); });

    // Database setting
    if (builder.Environment.IsProduction())
    {
        var connectionString = builder.Configuration.GetConnectionString("InspectionContext");
        builder.Services.AddDbContext<InspectionContext>(options =>
            options.UseNpgsql(connectionString)
        );
    }
    else if (builder.Environment.IsDevelopment())
    {
        var connectionString = builder.Configuration.GetConnectionString("DevelopContext");
        builder.Services.AddDbContext<InspectionContext>(options =>
            options.UseSqlite(connectionString)
        );
    }

    // Dependency injection setting
    builder.Services.AddScoped<IInspectionSheetRepository, InspectionSheetRepository>();
    builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
    builder.Services.AddScoped<IInspectionSheetService, InspectionSheetService>();
    builder.Services.AddScoped<IExcelDownloadService, ExcelDownloadService>();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Open API"
        });
        c.CustomSchemaIds(x =>
        {
            var attr = x.GetCustomAttribute<DisplayNameAttribute>();
            return (attr is not null) ? attr.DisplayName : x.Name;
        });
        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
    });
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger(c =>
        {
            c.PreSerializeFilters.Add((swagger, httpReq) =>
            {
                swagger.Servers = new List<OpenApiServer>
                {
                    new OpenApiServer
                    {
                        Url = $"{httpReq.Scheme}://{httpReq.Host.Value}"
                    }
                };
            });
        });
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.yaml", "v1");
            c.RoutePrefix = string.Empty;
        });
    }

    // app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    // Database initialization process
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        DbInitializer.Seed(services);
    }
}
app.Run();

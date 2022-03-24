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

    // open API setting
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Open API"
        });
    });
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.yaml", "Open API");
        });
    }
    else
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        // app.UseHsts();
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
app.MapFallbackToFile("index.html");
app.Run();

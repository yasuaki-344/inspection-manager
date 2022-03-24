﻿using InspectionManager.ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace InspectionManager.Infrastructure;

public class InspectionContext : DbContext
{
    public InspectionContext(DbContextOptions<InspectionContext> options) : base(options)
    {

    }

    public DbSet<InspectionType>? InspectionTypes { get; set; }
    public DbSet<InspectionGroup>? InspectionGroups { get; set; }
    public DbSet<Option>? Options { get; set; }
    public DbSet<ChoiceTemplate>? ChoiceTemplates { get; set; }
    public DbSet<InputType>? InputTypes { get; set; }
    public DbSet<Choice>? Choices { get; set; }
    public DbSet<InspectionItem>? InspectionItems { get; set; }
    public DbSet<Equipment>? Equipments { get; set; }
    public DbSet<InspectionSheet>? InspectionSheets { get; set; }
}

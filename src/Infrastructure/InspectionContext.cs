using InspectionManager.ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace InspectionManager.Infrastructure;

public class InspectionContext : DbContext
{
    public InspectionContext(DbContextOptions<InspectionContext> options) : base(options)
    {

    }

    public DbSet<InspectionType> InspectionTypes { get; set; } = null!;
    public DbSet<InspectionGroup> InspectionGroups { get; set; } = null!;
    public DbSet<Option> Options { get; set; } = null!;
    public DbSet<ChoiceTemplate> ChoiceTemplates { get; set; } = null!;
    public DbSet<InputType> InputTypes { get; set; } = null!;
    public DbSet<Choice> Choices { get; set; } = null!;
    public DbSet<InspectionItem> InspectionItems { get; set; } = null!;
    public DbSet<Equipment> Equipments { get; set; } = null!;
    public DbSet<InspectionSheet> InspectionSheets { get; set; } = null!;
}

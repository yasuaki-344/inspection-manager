using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents inspection sheet entity
/// </summary>
///
[Table("inspection_sheets")]
public class InspectionSheet
{
    [Key]
    [Column("id")]
    public int SheetId { get; set; }

    [Column("sheet_name")]
    public string SheetName { get; set; } = string.Empty;

    [Column("inspection_type_id")]
    public int InspectionTypeId { get; set; }

    public InspectionType InspectionType { get; set; } = null!;

    [Column("inspection_group_id")]
    public int InspectionGroupId { get; set; }

    public InspectionGroup InspectionGroup { get; set; } = null!;

    public ICollection<Equipment> Equipments { get; set; } = null!;
}

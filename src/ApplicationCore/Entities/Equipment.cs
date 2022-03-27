using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents equipment entity
/// </summary>
[Table("equipments")]
public class Equipment
{
    [Column("id")]
    public int EquipmentId { get; set; }

    [Column("order_index")]
    public int OrderIndex { get; set; }

    [Column("equipment_name")]
    public string EquipmentName { get; set; } = string.Empty;

    [Column("inspection_sheet_id")]
    public int InspectionSheetId { get; set; }

    public InspectionSheet InspectionSheet { get; set; } = null!;

    public ICollection<InspectionItem> InspectionItems { get; set; } = null!;
}

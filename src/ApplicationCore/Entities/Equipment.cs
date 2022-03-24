using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents equipment entity
/// </summary>
public class Equipment
{
    public int EquipmentId { get; set; }
    public int OrderIndex { get; set; }
    public string EquipmentName { get; set; } = string.Empty;
    public ICollection<InspectionItem> InspectionItems { get; set; } = null!;
    public int InspectionSheetId { get; set; }
    public InspectionSheet InspectionSheet { get; set; } = null!;
}

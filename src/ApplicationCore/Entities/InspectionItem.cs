using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents inspection item entity
/// </summary>
public class InspectionItem
{
    public int InspectionItemId { get; set; }
    public int OrderIndex { get; set; }
    public string InspectionContent { get; set; } = string.Empty;
    public int InputTypeId { get; set; }
    public InputType InputType { get; set; } = null!;
    public ICollection<Choice> Choices { get; set; } = null!;
    public int EquipmentId { get; set; }
    public Equipment Equipment { get; set; } = null!;
}

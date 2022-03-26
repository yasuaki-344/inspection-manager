using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents inspection item entity
/// </summary>
[Table("inspection_items")]
public class InspectionItem
{
    [Column("id")]
    public int InspectionItemId { get; set; }

    [Column("order_index")]
    public int OrderIndex { get; set; }

    [Column("inspection_content")]
    public string InspectionContent { get; set; } = string.Empty;

    [Column("input_type_id")]
    public int InputTypeId { get; set; }
    public InputType InputType { get; set; } = null!;
    public ICollection<Choice> Choices { get; set; } = null!;

    [Column("equipment_id")]
    public int EquipmentId { get; set; }

    public Equipment Equipment { get; set; } = null!;
}

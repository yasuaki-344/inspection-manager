using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents input type entity
/// </summary>
[Table("input_types")]
public class InputType
{
    [Column("id")]
    public int InputTypeId { get; set; }

    [Column("description")]
    public string Description { get; set; } = string.Empty;

    public ICollection<InspectionItem> InspectionItems { get; set; } = null!;
}

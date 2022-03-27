using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents Choice entity
/// </summary>
[Table("choices")]
public class Choice
{
    [Column("id")]
    public int ChoiceId { get; set; }

    [Column("order_index")]
    public int OrderIndex { get; set; }

    [Column("description")]
    public string Description { get; set; } = string.Empty;

    [Column("inspection_item_id")]
    public int InspectionItemId { get; set; }

    public InspectionItem InspectionItem { get; set; } = null!;
}

using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents option entity
/// </summary>
[Table("options")]
public class Option
{
    [Column("id")]
    public int OptionId { get; set; }

    [Column("order_index")]
    public int OrderIndex { get; set; }

    [Column("description")]
    public string Description { get; set; } = string.Empty;

    [Column("choice_template_id")]
    public int ChoiceTemplateId { get; set; }

    public ChoiceTemplate ChoiceTemplate { get; set; } = null!;
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Choice set template data structure
/// </summary>
[Table("choice_templates")]
public class ChoiceTemplate
{
    [Column("id")]
    public int ChoiceTemplateId { get; set; }
    public ICollection<Option> Choices { get; set; } = null!;
}

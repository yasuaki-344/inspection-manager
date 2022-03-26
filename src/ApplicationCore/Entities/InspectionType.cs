using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

[Table("inspection_types")]
public class InspectionType
{
    [Column("id")]
    public int InspectionTypeId { get; set; }

    [Column("description")]
    public string Description { get; set; } = string.Empty;

    public ICollection<InspectionSheet> InspectionSheets { get; set; } = null!;
}

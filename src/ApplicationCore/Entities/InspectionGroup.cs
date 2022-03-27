using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InspectionManager.ApplicationCore.Entities;

[Table("inspection_groups")]
public class InspectionGroup
{
    [Column("id")]
    public int InspectionGroupId { get; set; }

    [Column("description")]
    public string Description { get; set; } = string.Empty;

    public ICollection<InspectionSheet> InspectionSheets { get; set; } = null!;
}

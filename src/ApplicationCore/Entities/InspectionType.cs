using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities;

public class InspectionType
{
    public int InspectionTypeId { get; set; }
    public string Description { get; set; } = string.Empty;
    public ICollection<InspectionSheet> InspectionSheets { get; set; } = new List<InspectionSheet>();
}

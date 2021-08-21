using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities
{
    public class InspectionGroup
    {
        public int InspectionGroupId { get; set; }
        public string Description { get; set; } = string.Empty;
        public ICollection<InspectionSheet> InspectionSheets { get; set; } = new List<InspectionSheet>();
    }
}

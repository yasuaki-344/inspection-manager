using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents input type entity
    /// </summary>
    public class InputType
    {
        public int InputTypeId { get; set; }
        public string Description { get; set; } = string.Empty;
        public ICollection<InspectionItem> InspectionItems { get; set; } = new List<InspectionItem>();
    }
}

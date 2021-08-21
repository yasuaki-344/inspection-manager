using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents inspection sheet entity
    /// </summary>
    ///
    public class InspectionSheet
    {
        [Key]
        public int SheetId { get; set; }
        public string SheetName { get; set; } = string.Empty;
        public int InspectionTypeId { get; set; }
        public InspectionType InspectionType { get; set; } = new InspectionType();
        public int InspectionGroupId { get; set; }
        public InspectionGroup InspectionGroup { get; set; } = new InspectionGroup();
        public ICollection<Equipment> Equipments { get; set; } = new List<Equipment>();
    }
}

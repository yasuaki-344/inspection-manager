//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents inspection item entity
    /// </summary>
    public class InspectionItem
    {
        public int InspectionItemId { get; set; }
        public int OrderIndex { get; set; }
        public string InspectionContent { get; set; } = string.Empty;
        public int InputTypeId { get; set; }
        public InputType InputType { get; set; } = new InputType();
        public ICollection<Choice> Choices { get; set; } = new List<Choice>();
        public int EquipmentId { get; set; }
        public Equipment Equipment { get; set; } = new Equipment();
    }
}

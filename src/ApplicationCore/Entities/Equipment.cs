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
    /// Represents equipment entity
    /// </summary>
    public class Equipment
    {
        public int EquipmentId { get; set; }
        public int OrderIndex { get; set; }
        public string EquipmentName { get; set; } = string.Empty;
        public ICollection<InspectionItem> InspectionItems { get; set; } = new List<InspectionItem>();
        public int InspectionSheetId { get; set; }
        public InspectionSheet InspectionSheet { get; set; } = new InspectionSheet();
    }
}

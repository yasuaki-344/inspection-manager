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
    /// Represents inspection sheet entity
    /// </summary>
    ///
    public class InspectionSheet
    {
        public int SheetId { get; set; }
        public string SheetName { get; set; } = string.Empty;
        public int InspectionTypeId { get; set; }
        public InspectionType InspectionType { get; set; } = new InspectionType();
        public int InspectionGroupId { get; set; }
        public InspectionGroup InspectionGroup { get; set; } = new InspectionGroup();
        public ICollection<Equipment> Equipments { get; set; } = new List<Equipment>();
    }
}

﻿//
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
        public int InspectionSheetId { get; set; }
        public string SheetName { get; set; } = string.Empty;
        public InspectionType InspectionType { get; set; } = new InspectionType();
        public InspectionGroup InspectionGroup { get; set; } = new InspectionGroup();
        public List<Equipment> Equipments { get; set; } = new List<Equipment>();
    }
}

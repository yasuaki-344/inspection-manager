//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class TransitionExportDto
    {
        [JsonPropertyName("sheet_id")]
        public int SheetId { get; set; }

        [JsonPropertyName("equipment_id")]
        public int EquipmentId { get; set; }

        [JsonPropertyName("inspection_item_id")]
        public int InspectionItemId { get; set; }
    }
}

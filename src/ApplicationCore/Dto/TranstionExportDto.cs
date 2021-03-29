//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class TransitionExportDto
    {
        [JsonPropertyName("sheet_id")]
        public string SheetId { get; set; } = string.Empty;

        [JsonPropertyName("equipment_id")]
        public string EquipmentId { get; set; } = string.Empty;

        [JsonPropertyName("inspection_item_id")]
        public int InspectionItemId { get; set; }
    }
}

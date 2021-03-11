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
    public class EquipmentDto
    {
        [JsonPropertyName("equipment_id")]
        public string EquipmentId { get; set; } = string.Empty;

        [JsonPropertyName("equipment_name")]
        public string EquipmentName { get; set; } = string.Empty;

        [JsonPropertyName("inspection_items")]
        public List<InspectionItemDto> Equipments { get; set; } = new List<InspectionItemDto>();
    }
}

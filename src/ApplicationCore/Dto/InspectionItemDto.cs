//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionItemDto
    {
        [JsonPropertyName("inspection_item_id")]
        public string InspectionItemId { get; set; } = string.Empty;

        [JsonPropertyName("inspection_content")]
        public string InspectionContent { get; set; } = string.Empty;

        [JsonPropertyName("input_type")]
        public int InputType { get; set; } = 1;
    }
}

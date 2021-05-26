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
    public class InspectionItemDto
    {
        [JsonPropertyName("inspection_item_id")]
        public int InspectionItemId { get; set; }

        [JsonPropertyName("inspection_content")]
        public string InspectionContent { get; set; } = string.Empty;

        [JsonPropertyName("input_type")]
        public int InputType { get; set; }

        [JsonPropertyName("choices")]
        public List<string> Choices { get; set; } = new List<string>();
    }
}

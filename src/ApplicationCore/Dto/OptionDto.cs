//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class OptionDto
    {
        [JsonPropertyName("option_id")]
        public int OptionId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }
}

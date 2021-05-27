//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class ChoiceDto
    {
        [JsonPropertyName("choice_id")]
        public int ChoiceId { get; set; }

        [JsonPropertyName("description_id")]
        public string Description { get; set; } = string.Empty;
    }
}

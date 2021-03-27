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
    public class ChoiceTemplateDto
    {
        [JsonPropertyName("choices")]
        public List<string> Choices { get; set; } = new List<string>();
    }
}

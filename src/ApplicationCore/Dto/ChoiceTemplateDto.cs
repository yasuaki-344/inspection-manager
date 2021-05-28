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
    /// <summary>
    /// Choice set template data structure
    /// </summary>
    public class ChoiceTemplateDto
    {
        [JsonPropertyName("choice_template_id")]
        public int ChoiceTemplateId { get; set; }

        [JsonPropertyName("choices")]
        public List<OptionDto> Choices { get; set; } = new List<OptionDto>();
    }
}

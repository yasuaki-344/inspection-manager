using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    /// <summary>
    /// Choice set template data structure
    /// </summary>
    public class ChoiceTemplateDto
    {
        [JsonPropertyName("id")]
        public int ChoiceTemplateId { get; set; }

        [JsonPropertyName("choices")]
        public List<OptionDto> Choices { get; set; } = new List<OptionDto>();
    }
}

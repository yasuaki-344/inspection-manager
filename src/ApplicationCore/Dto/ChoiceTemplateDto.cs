using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

/// <summary>
/// Choice set template data structure
/// </summary>
[DisplayName("ChoiceTemplate")]
public class ChoiceTemplateDto
{
    [Required]
    [JsonPropertyName("id")]
    public int ChoiceTemplateId { get; set; }

    [Required]
    [JsonPropertyName("choices")]
    public List<OptionDto> Choices { get; set; } = new List<OptionDto>();
}

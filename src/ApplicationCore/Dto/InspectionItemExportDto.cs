using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionItemExport")]
public class InspectionItemExportDto
{
    [Required]
    [JsonPropertyName("inspection_item_id")]
    public int InspectionItemId { get; set; }

    [Required]
    [JsonPropertyName("inspection_content")]
    public string InspectionContent { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("input_method")]
    public int InputMethod { get; set; }

    [Required]
    [JsonPropertyName("choices")]
    public List<string> Choices { get; set; } = new List<string>();

    [Required]
    [JsonPropertyName("input_value")]
    public string InputValue { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("transitions")]
    public List<TransitionExportDto> Transitions { get; set; } = new List<TransitionExportDto>();
}

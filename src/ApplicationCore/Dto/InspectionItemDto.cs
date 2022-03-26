using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionItem")]
public class InspectionItemDto
{
    [Required]
    [JsonPropertyName("inspection_item_id")]
    public int InspectionItemId { get; set; }

    [Required]
    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [Required]
    [JsonPropertyName("inspection_content")]
    public string InspectionContent { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("input_type")]
    public int InputTypeId { get; set; }

    [Required]
    [JsonPropertyName("choices")]
    public List<ChoiceDto> Choices { get; set; } = new List<ChoiceDto>();
}

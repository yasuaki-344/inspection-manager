using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class InspectionItemDto
{
    [JsonPropertyName("inspection_item_id")]
    public int InspectionItemId { get; set; }

    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [JsonPropertyName("inspection_content")]
    public string InspectionContent { get; set; } = string.Empty;

    [JsonPropertyName("input_type")]
    public int InputTypeId { get; set; }

    [JsonPropertyName("choices")]
    public List<ChoiceDto> Choices { get; set; } = new List<ChoiceDto>();
}

using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class ChoiceDto
{
    [JsonPropertyName("choice_id")]
    public int ChoiceId { get; set; }

    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

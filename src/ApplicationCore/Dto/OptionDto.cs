using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class OptionDto
{
    [JsonPropertyName("option_id")]
    public int OptionId { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

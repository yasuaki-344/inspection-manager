using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class InspectionTypeDto
{
    [JsonPropertyName("id")]
    public int InspectionTypeId { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

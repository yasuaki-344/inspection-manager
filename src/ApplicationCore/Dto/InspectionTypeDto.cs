using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionType")]
public class InspectionTypeDto
{
    [Required]
    [JsonPropertyName("id")]
    public int InspectionTypeId { get; set; }

    [Required]
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

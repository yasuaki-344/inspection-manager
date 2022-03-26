using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionGroup")]
public class InspectionGroupDto
{
    [Required]
    [JsonPropertyName("id")]
    public int InspectionGroupId { get; set; }

    [Required]
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

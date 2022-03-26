using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("Option")]
public class OptionDto
{
    [Required]
    [JsonPropertyName("option_id")]
    public int OptionId { get; set; }

    [Required]
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

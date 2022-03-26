using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("Choice")]
public class ChoiceDto
{
    [Required]
    [JsonPropertyName("choice_id")]
    public int ChoiceId { get; set; }

    [Required]
    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [Required]
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

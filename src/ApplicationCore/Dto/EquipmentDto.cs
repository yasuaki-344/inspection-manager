using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("Equipment")]
public class EquipmentDto
{
    [Required]
    [JsonPropertyName("equipment_id")]
    public int EquipmentId { get; set; }

    [Required]
    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [Required]
    [JsonPropertyName("equipment_name")]
    public string EquipmentName { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_items")]
    public List<InspectionItemDto> InspectionItems { get; set; } = new List<InspectionItemDto>();
}

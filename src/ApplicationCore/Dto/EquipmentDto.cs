using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class EquipmentDto
{
    [JsonPropertyName("equipment_id")]
    public int EquipmentId { get; set; }

    [JsonPropertyName("order_index")]
    public int OrderIndex { get; set; }

    [JsonPropertyName("equipment_name")]
    public string EquipmentName { get; set; } = string.Empty;

    [JsonPropertyName("inspection_items")]
    public List<InspectionItemDto> InspectionItems { get; set; } = new List<InspectionItemDto>();
}

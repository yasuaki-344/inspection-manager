using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("EquipmentExport")]
public class EquipmentExportDto
{
    [Required]
    [JsonPropertyName("equipment_id")]
    public string EquipmentId { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("equipment_name")]
    public string EquipmentName { get; set; } = string.Empty;

    [JsonPropertyName("rf_id")]
    public string RfId { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_items")]
    public List<InspectionItemExportDto> InspectionItems { get; set; } = new List<InspectionItemExportDto>();
}

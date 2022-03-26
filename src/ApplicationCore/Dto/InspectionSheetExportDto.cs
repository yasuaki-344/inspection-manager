using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("AccessToken")]
public class InspectionSheetExportDto
{
    [Required]
    [JsonPropertyName("sheet_id")]
    public string SheetId { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("sheet_name")]
    public string SheetName { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_type")]
    public string InspectionType { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_group")]
    public string InspectionGroup { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_date")]
    public string InspectionDate { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("equipments")]
    public List<EquipmentExportDto> Equipments { get; set; } = new List<EquipmentExportDto>();
}

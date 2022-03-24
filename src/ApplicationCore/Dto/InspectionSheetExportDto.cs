using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

public class InspectionSheetExportDto
{
    [JsonPropertyName("sheet_id")]
    public string SheetId { get; set; } = string.Empty;

    [JsonPropertyName("sheet_name")]
    public string SheetName { get; set; } = string.Empty;

    [JsonPropertyName("inspection_type")]
    public string InspectionType { get; set; } = string.Empty;

    [JsonPropertyName("inspection_group")]
    public string InspectionGroup { get; set; } = string.Empty;

    [JsonPropertyName("inspection_date")]
    public string InspectionDate { get; set; } = string.Empty;

    [JsonPropertyName("equipments")]
    public List<EquipmentExportDto> Equipments { get; set; } = new List<EquipmentExportDto>();
}

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionSheet")]
public class InspectionSheetDto
{
    [Required]
    [JsonPropertyName("sheet_id")]
    public int SheetId { get; set; }

    [Required]
    [JsonPropertyName("sheet_name")]
    public string SheetName { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_type_id")]
    public int InspectionTypeId { get; set; }

    [Required]
    [JsonPropertyName("inspection_group_id")]
    public int InspectionGroupId { get; set; }

    [Required]
    [JsonPropertyName("equipments")]
    public ICollection<EquipmentDto> Equipments { get; set; } = new List<EquipmentDto>();
}

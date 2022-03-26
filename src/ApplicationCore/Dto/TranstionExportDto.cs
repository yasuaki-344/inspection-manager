using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("TransitionExport")]
public class TransitionExportDto
{
    [Required]
    [JsonPropertyName("sheet_id")]
    public string SheetId { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("equipment_id")]
    public string EquipmentId { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("inspection_item_id")]
    public int InspectionItemId { get; set; }
}

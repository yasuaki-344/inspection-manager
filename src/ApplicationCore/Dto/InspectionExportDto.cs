using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto;

[DisplayName("InspectionExport")]
public class InspectionExportDto
{
    [Required]
    [JsonPropertyName("inspection_sheet")]
    public InspectionSheetExportDto Sheet { get; set; } = new InspectionSheetExportDto();
}

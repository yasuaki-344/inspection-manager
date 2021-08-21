using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionExportDto
    {
        [JsonPropertyName("inspection_sheet")]
        public InspectionSheetExportDto Sheet { get; set; } = new InspectionSheetExportDto();
    }
}

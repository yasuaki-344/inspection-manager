using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionSheetDetailDto
    {
        [JsonPropertyName("sheet_id")]
        public int SheetId { get; set; }

        [JsonPropertyName("sheet_name")]
        public string SheetName { get; set; } = string.Empty;

        [JsonPropertyName("inspection_type_id")]
        public int InspectionTypeId { get; set; }

        [JsonPropertyName("inspection_group_id")]
        public int InspectionGroupId { get; set; }

        [JsonPropertyName("equipments")]
        public ICollection<EquipmentDto> Equipments { get; set; } = new List<EquipmentDto>();
    }
}

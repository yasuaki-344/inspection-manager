using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionGroupDto
    {
        [JsonPropertyName("inspection_group_id")]
        public int InspectionGroupId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }
}

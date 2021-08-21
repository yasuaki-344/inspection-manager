using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class ChoiceDto
    {
        [JsonPropertyName("choice_id")]
        public int ChoiceId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }
}

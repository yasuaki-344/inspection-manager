//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionSheetSummaryDto
    {
        [JsonPropertyName("sheet_id")]
        public int SheetId { get; set; }

        [JsonPropertyName("sheet_name")]
        public string SheetName { get; set; } = string.Empty;

        [JsonPropertyName("inspection_type")]
        public string InspectionType { get; set; } = string.Empty;

        [JsonPropertyName("inspection_group")]
        public string InspectionGroup { get; set; } = string.Empty;
    }
}

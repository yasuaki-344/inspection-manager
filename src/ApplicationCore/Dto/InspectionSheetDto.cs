//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionSheetDto
    {
        [JsonPropertyName("sheet_id")]
        public string SheetId { get; set; } = string.Empty;

        [JsonPropertyName("sheet_name")]
        public string SheetName { get; set; } = string.Empty;
    }
}

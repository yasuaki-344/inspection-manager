//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Text.Json.Serialization;

namespace InspectionManager.ApplicationCore.Dto
{
    public class InspectionExportDto
    {
        [JsonPropertyName("inspection_sheet")]
        public InspectionSheetExportDto Sheet { get; set; } = new InspectionSheetExportDto();
    }
}

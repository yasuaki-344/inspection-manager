//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System.IO;
using System.Text.Json;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure
{
    public class InspectionSheetFileRepository : IInspectionSheetRepository
    {
        public InspectionSheetFileRepository()
        {

        }

        public void CreateInspectionSheet(InspectionSheetDto dto)
        {
            var json = JsonSerializer.Serialize(dto);
            File.WriteAllText("example.json", json);
        }
    }
}

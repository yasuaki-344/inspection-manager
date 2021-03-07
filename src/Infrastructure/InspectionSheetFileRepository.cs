//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure
{
    public class InspectionSheetFileRepository : IInspectionSheetRepository
    {
        private readonly string _baseDirectory = "inspection-sheet";

        /// <summary>
        /// Initializes a new instance of InspectionSheetFileRepository class.
        /// </summary>
        public InspectionSheetFileRepository()
        {
            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }
        }

        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets()
        {
            return new List<InspectionSheetDto>()
            {
                new InspectionSheetDto
                {
                    SheetName = "pattern1",
                },
                new InspectionSheetDto
                {
                    SheetName = "pattern2",
                }
            };
        }

        public void CreateInspectionSheet(InspectionSheetDto dto)
        {
            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }
            var guid = Guid.NewGuid();
            var filePath = Path.Join(_baseDirectory, $"{guid}.json");

            if (File.Exists(filePath))
            {
                throw new IOException($"{filePath} already exists");
            }
            var json = JsonSerializer.Serialize(dto);
            File.WriteAllText(filePath, json);
        }
    }
}

//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

        /// <summary>
        /// Gets all inspection sheets from database.
        /// </summary>
        /// <returns>All inspection sheets</returns>
        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets()
        {
            if (!Directory.Exists(_baseDirectory))
            {
                throw new DirectoryNotFoundException(_baseDirectory);
            }
            var files = Directory.GetFiles(_baseDirectory, "*.json", SearchOption.TopDirectoryOnly);

            var inspectionSheets = files
                .Select(x => {
                    var json = File.ReadAllText(x);
                    return JsonSerializer.Deserialize<InspectionSheetDto>(json);
                })
                .Where(x => x != null)
                .Select(x => x!);
            return inspectionSheets ?? new List<InspectionSheetDto>();
        }

        /// <summary>
        /// Creates new inspection sheet by using the specified InspectionSheetDto.
        /// </summary>
        /// <param name="dto">Inspection sheet information</param>
        public void CreateInspectionSheet(InspectionSheetDto dto)
        {
            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }

            var guid = Guid.NewGuid().ToString();
            var filePath = Path.Join(_baseDirectory, $"{guid}.json");
            if (File.Exists(filePath))
            {
                throw new IOException($"{filePath} already exists");
            }
            dto.SheetId = guid;
            var json = JsonSerializer.Serialize(dto);
            File.WriteAllText(filePath, json);
        }
    }
}

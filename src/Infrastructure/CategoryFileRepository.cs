//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.IO;
using System.Text.Json;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure
{
    public class CategoryFileRepository : ICategoryRepository
    {
        private readonly string _baseDirectory = "categories";
        private readonly string _inspectionGroupsFile = "inspection-group.json";
        private readonly string _inspectionTypesFile = "inspection-type.json";

        /// <summary>
        /// Initializes a new instance of CategoryFileRepository class.
        /// </summary>
        public CategoryFileRepository()
        {
        }

        /// <inheritdoc/>
        public string[] GetInspectionGroups()
        {
            if (!Directory.Exists(_baseDirectory))
            {
                throw new DirectoryNotFoundException(_baseDirectory);
            }
            var filePath = Path.Join(_baseDirectory, _inspectionGroupsFile);
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException(filePath);
            }
            var json = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<string[]>(json) ?? new string[] { };
        }

        /// <inheritdoc/>
        public string[] CreateInspectionGroups(string[] groups)
        {
            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }

            var filePath = Path.Join(_baseDirectory, _inspectionGroupsFile);

            var json = JsonSerializer.Serialize(groups);
            File.WriteAllText(filePath, json);
            return groups;
        }

        /// <inheritdoc/>
        public string[] GetInspectionTypes()
        {
            if (!Directory.Exists(_baseDirectory))
            {
                throw new DirectoryNotFoundException(_baseDirectory);
            }
            var filePath = Path.Join(_baseDirectory, _inspectionTypesFile);
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException(filePath);
            }
            var json = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<string[]>(json) ?? new string[] { };
        }

        /// <inheritdoc/>
        public string[] CreateInspectionTypes(string[] groups)
        {
            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }

            var filePath = Path.Join(_baseDirectory, _inspectionTypesFile);

            var json = JsonSerializer.Serialize(groups);
            File.WriteAllText(filePath, json);
            return groups;
        }

    }
}

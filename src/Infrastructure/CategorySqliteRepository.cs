//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure
{
    public class CategorySqliteRepository : ICategoryRepository
    {
        private readonly InspectionContext _context;

        /// <summary>
        /// Initializes a new instance of CategorySqliteRepository class.
        /// </summary>
        /// <param name="context"></param>
        public CategorySqliteRepository(InspectionContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public string[] GetInspectionGroups()
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public string[] CreateInspectionGroups(string[] groups)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public string[] GetInspectionTypes()
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public string[] CreateInspectionTypes(string[] groups)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public IEnumerable<ChoiceTemplateDto> GetChoiceTemplates()
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public IEnumerable<ChoiceTemplateDto> CreateChoiceTemplates(
            IEnumerable<ChoiceTemplateDto> templates
        )
        {
            throw new System.NotImplementedException();
        }
    }
}

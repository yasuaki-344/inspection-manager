//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Linq;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
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
            if (_context.InspectionTypes != null)
            {
                return _context.InspectionTypes.Select(x => x.Text).ToArray();
            }
            else
            {
                return new string[] { };
            }
        }

        /// <inheritdoc/>
        public string[] CreateInspectionTypes(string[] types)
        {
            if (_context.InspectionTypes != null)
            {
                _context.InspectionTypes.RemoveRange(_context.InspectionTypes);
                _context.InspectionTypes.AddRange(types.Select(x =>
                    new InspectionType { Text = x }
                ).ToArray());
                _context.SaveChanges();
                return _context.InspectionTypes.Select(x => x.Text).ToArray();
            }
            else
            {
                return new string[] { };
            }
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

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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly InspectionContext _context;

        /// <summary>
        /// Initializes a new instance of CategoryRepository class.
        /// </summary>
        /// <param name="context"></param>
        public CategoryRepository(InspectionContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionGroupDto> GetInspectionGroups()
        {
            if (_context.InspectionGroups != null)
            {
                return _context.InspectionGroups
                    .Select(x => new InspectionGroupDto
                    {
                        InspectionGroupId = x.InspectionGroupId,
                        Description = x.Description
                    })
                    .ToList();
            }
            else
            {
                return new List<InspectionGroupDto>();
            }
        }

        /// <inheritdoc/>
        public string[] CreateInspectionGroups(string[] groups)
        {
            if (_context.InspectionGroups != null)
            {
                _context.InspectionGroups.RemoveRange(_context.InspectionGroups);
                _context.InspectionGroups.AddRange(groups.Select(x =>
                    new InspectionGroup { Description = x }
                ).ToArray());
                _context.SaveChanges();
                return _context.InspectionGroups.Select(x => x.Description).ToArray();
            }
            else
            {
                return new string[] { };
            }
        }

        /// <inheritdoc/>
        public string[] GetInspectionTypes()
        {
            if (_context.InspectionTypes != null)
            {
                return _context.InspectionTypes.Select(x => x.Description).ToArray();
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
                    new InspectionType { Description = x }
                ).ToArray());
                _context.SaveChanges();
                return _context.InspectionTypes.Select(x => x.Description).ToArray();
            }
            else
            {
                return new string[] { };
            }
        }

        /// <inheritdoc/>
        public IEnumerable<ChoiceTemplateDto> GetChoiceTemplates()
        {
            if (_context.ChoiceTemplates != null)
            {
                return _context.ChoiceTemplates.Select(x =>
                    new ChoiceTemplateDto
                    {
                        ChoiceTemplateId = x.ChoiceTemplateId,
                        Choices = x.Choices.Select(e => e.Description).ToList()
                    }
                );
            }
            else
            {
                return new List<ChoiceTemplateDto>();
            }
        }

        /// <inheritdoc/>
        public IEnumerable<ChoiceTemplateDto> CreateChoiceTemplates(
            IEnumerable<ChoiceTemplateDto> templates
        )
        {
            if (_context.ChoiceTemplates != null && _context.Choices != null)
            {
                _context.RemoveRange(_context.Choices);
                _context.RemoveRange(_context.ChoiceTemplates);
                _context.ChoiceTemplates.AddRange(
                    templates.Select(x => new ChoiceTemplate
                    {
                        ChoiceTemplateId = x.ChoiceTemplateId,
                        Choices = x.Choices.Select(e =>
                            new Option { Description = e }
                        ).ToList()
                    })
                );
                _context.SaveChanges();
                return _context.ChoiceTemplates.Select(x =>
                    new ChoiceTemplateDto
                    {
                        ChoiceTemplateId = x.ChoiceTemplateId,
                        Choices = x.Choices.Select(e => e.Description).ToList()
                    }
                );
            }
            else
            {
                return new List<ChoiceTemplateDto>();
            }
        }
    }
}

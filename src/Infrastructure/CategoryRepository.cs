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
using AutoMapper;

namespace InspectionManager.Infrastructure
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly InspectionContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of CategoryRepository class.
        /// </summary>
        /// <param name="context">Database context</param>
        /// <param name="mapper">O/R mapper object</param>
        public CategoryRepository(InspectionContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionGroupDto> GetInspectionGroups()
        {
            if (_context.InspectionGroups != null)
            {
                return _context.InspectionGroups
                    .Select(x => _mapper.Map<InspectionGroupDto>(x))
                    .ToList();
            }
            else
            {
                return new List<InspectionGroupDto>();
            }
        }

        /// <inheritdoc/>
        public InspectionGroupDto? GetInspectionGroup(int id)
        {
            if (_context.InspectionGroups != null)
            {
                var entity = _context.InspectionGroups.Single(x => x.InspectionGroupId == id);
                if (entity != null)
                {
                    return _mapper.Map<InspectionGroupDto>(entity);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        /// <inheritdoc/>
        public InspectionGroupDto CreateInspectionGroup(InspectionGroupDto dto)
        {
            if (_context.InspectionGroups != null)
            {
                var entity = _mapper.Map<InspectionGroup>(dto);
                _context.InspectionGroups.Add(entity);
                _context.SaveChanges();

                return _mapper.Map<InspectionGroupDto>(entity);
            }
            else
            {
                return new InspectionGroupDto();
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

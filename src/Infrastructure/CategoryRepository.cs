﻿//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Interfaces;

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
        public bool InspectionGroupExists(int id)
        {
            if (_context.InspectionGroups != null)
            {
                return _context.InspectionGroups.Any(x => x.InspectionGroupId == id);
            }
            else
            {
                return false;
            }
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
        public async Task<InspectionGroupDto> CreateInspectionGroupAsync(InspectionGroupDto dto)
        {
            if (_context.InspectionGroups != null)
            {
                var entity = _mapper.Map<InspectionGroup>(dto);
                await _context.InspectionGroups.AddAsync(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionGroupDto>(entity);
            }
            else
            {
                return new InspectionGroupDto();
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionGroupDto> UpdateInspectionGroupAsync(InspectionGroupDto dto)
        {
            if (_context.InspectionGroups != null)
            {
                var entity = _mapper.Map<InspectionGroup>(dto);
                _context.InspectionGroups.Update(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionGroupDto>(entity);
            }
            else
            {
                return new InspectionGroupDto();
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionGroupDto> DeleteInspectionGroupAsync(int id)
        {
            if (_context.InspectionGroups != null)
            {
                var entity = _context.InspectionGroups.Single(x => x.InspectionGroupId == id);
                if (entity != null)
                {
                    _context.InspectionGroups.Remove(entity);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<InspectionGroupDto>(entity);
                }
                else
                {
                    return new InspectionGroupDto();
                }
            }
            else
            {
                return new InspectionGroupDto();
            }
        }

        /// <inheritdoc/>
        public bool InspectionTypeExists(int id)
        {
            if (_context.InspectionTypes != null)
            {
                return _context.InspectionTypes.Any(x => x.InspectionTypeId == id);
            }
            else
            {
                return false;
            }
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionTypeDto> GetInspectionTypes()
        {
            if (_context.InspectionTypes != null)
            {
                return _context.InspectionTypes
                    .Select(x => _mapper.Map<InspectionTypeDto>(x))
                    .ToList();
            }
            else
            {
                return new List<InspectionTypeDto>();
            }
        }

        /// <inheritdoc/>
        public InspectionTypeDto? GetInspectionType(int id)
        {
            if (_context.InspectionTypes != null)
            {
                var entity = _context.InspectionTypes.Single(x => x.InspectionTypeId == id);
                if (entity != null)
                {
                    return _mapper.Map<InspectionTypeDto>(entity);
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
        public async Task<InspectionTypeDto> CreateInspectionTypeAsync(InspectionTypeDto dto)
        {
            if (_context.InspectionTypes != null)
            {
                var entity = _mapper.Map<InspectionType>(dto);
                await _context.InspectionTypes.AddAsync(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionTypeDto>(entity);
            }
            else
            {
                return new InspectionTypeDto();
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionTypeDto> UpdateInspectionTypeAsync(InspectionTypeDto dto)
        {
            if (_context.InspectionTypes != null)
            {
                var entity = _mapper.Map<InspectionType>(dto);
                _context.InspectionTypes.Update(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionTypeDto>(entity);
            }
            else
            {
                return new InspectionTypeDto();
            }
        }


        /// <inheritdoc/>
        public async Task<InspectionTypeDto> DeleteInspectionTypeAsync(int id)
        {
            if (_context.InspectionTypes != null)
            {
                var entity = _context.InspectionTypes.Single(x => x.InspectionTypeId == id);
                if (entity != null)
                {
                    _context.InspectionTypes.Remove(entity);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<InspectionTypeDto>(entity);
                }
                else
                {
                    return new InspectionTypeDto();
                }
            }
            else
            {
                return new InspectionTypeDto();
            }
        }

        /// <inheritdoc/>
        public bool ChoiceTemplateExists(int id)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public IEnumerable<ChoiceTemplateDto> GetChoiceTemplates()
        {
            if (_context.ChoiceTemplates != null)
            {
                return _context.ChoiceTemplates
                    .Select(x => _mapper.Map<ChoiceTemplateDto>(x))
                    .ToList();
            }
            else
            {
                return new List<ChoiceTemplateDto>();
            }
        }

        /// <inheritdoc/>
        public ChoiceTemplateDto? GetChoiceTemplate(int id)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public Task<ChoiceTemplateDto> CreateChoiceTemplateAsync(ChoiceTemplateDto dto)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public Task<ChoiceTemplateDto> UpdateChoiceTemplateAsync(ChoiceTemplateDto dto)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public Task<ChoiceTemplateDto> DeleteChoiceTemplateAsync(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}

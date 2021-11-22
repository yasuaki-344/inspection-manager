﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InspectionManager.Infrastructure
{
    public class InspectionSheetRepository : IInspectionSheetRepository
    {
        private readonly InspectionContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of InspectionSheetRepository class.
        /// </summary>
        /// <param name="context">Database context</param>
        /// <param name="mapper">O/R mapper object</param>
        public InspectionSheetRepository(InspectionContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <inheritdoc/>
        public bool InspectionSheetExists(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var sheetExists = _context.InspectionSheets.Any(s => s.SheetId == id);
                return sheetExists;
            }
            else
            {
                return false;
            }
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets()
        {
            if (_context.InspectionSheets != null)
            {
                var dto = _context.InspectionSheets
                    .ProjectTo<InspectionSheetDto>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.SheetId)
                    .ToList();
                return dto;
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public InspectionSheetDetailDto? GetInspectionSheet(int id)
        {
            if (_context.InspectionSheets != null)
            {
                if (_context.InspectionSheets.Any(x => x.SheetId == id))
                {
                    var dto = _context.InspectionSheets
                        .Where(x => x.SheetId == id)
                        .ProjectTo<InspectionSheetDetailDto>(_mapper.ConfigurationProvider)
                        .Single();

                    return dto;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public bool IsValidInspectionSheet(InspectionSheetDetailDto dto)
        {
            if (_context.InspectionGroups != null && _context.InspectionTypes != null)
            {
                var isGroupIdValid = _context.InspectionGroups
                    .Any(x => x.InspectionGroupId == dto.InspectionGroupId);
                var isTypeIdValid = _context.InspectionTypes
                    .Any(x => x.InspectionTypeId == dto.InspectionTypeId);
                return isGroupIdValid && isTypeIdValid;
            }
            else
            {
                throw new NullReferenceException(
                    $"{nameof(_context.InspectionGroups)} or {nameof(_context.InspectionTypes)}");
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDetailDto> CreateInspectionSheetAsync(InspectionSheetDetailDto dto)
        {
            if (_context.InspectionSheets is not null)
            {
                var entity = _mapper.Map<InspectionSheet>(dto);
                ReferRelationalEntities(entity);

                await _context.InspectionSheets.AddAsync(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDetailDto>(entity);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDetailDto> UpdateInspectionSheetAsync(InspectionSheetDetailDto dto)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _mapper.Map<InspectionSheet>(dto);
                RemoveUnusedRelationalEntities(entity);
                ReferRelationalEntities(entity);

                _context.InspectionSheets.Update(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDetailDto>(entity);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public async Task DeleteInspectionSheetAsync(int id)
        {
            if (_context.InspectionSheets is not null)
            {
                var entity = _context.InspectionSheets.First(s => s.SheetId == id);
                if (entity is not null)
                {
                    _context.InspectionSheets.Remove(entity);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        private void ReferRelationalEntities(InspectionSheet entity)
        {
            if (_context.InspectionGroups is not null)
            {
                entity.InspectionGroup = _context.InspectionGroups
                    .First(x => x.InspectionGroupId == entity.InspectionGroupId);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionGroups));
            }

            if (_context.InspectionTypes is not null)
            {
                entity.InspectionType = _context.InspectionTypes
                    .First(x => x.InspectionTypeId == entity.InspectionTypeId);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionTypes));
            }

            if (_context.InputTypes is not null)
            {
                foreach (var equipment in entity.Equipments)
                {
                    foreach (var inspectionItem in equipment.InspectionItems)
                    {
                        inspectionItem.InputType = _context.InputTypes
                            .First(x => x.InputTypeId == inspectionItem.InputTypeId);
                    }
                }
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InputTypes));
            }
        }

        private void RemoveUnusedRelationalEntities(InspectionSheet entity)
        {
            if (_context.Equipments is not null)
            {
                var ids = entity.Equipments.Select(x => x.EquipmentId);
                var target = _context.Equipments
                    .Where(x => x.InspectionSheetId == entity.SheetId)
                    .Where(x => !ids.Contains(x.EquipmentId));
                _context.Equipments.RemoveRange(target);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.Equipments));
            }

            if (_context.InspectionItems is not null)
            {
                foreach (var equipment in entity.Equipments)
                {
                    var ids = equipment.InspectionItems.Select(x => x.InspectionItemId);
                    var target = _context.InspectionItems
                        .Where(x => x.EquipmentId == equipment.EquipmentId)
                        .Where(x => !ids.Contains(x.InspectionItemId));
                    _context.InspectionItems.RemoveRange(target);
                }
            }
            else
            {
                throw new NullReferenceException(nameof(_context.Equipments));
            }

            if (_context.Choices is not null)
            {
                foreach (var equipment in entity.Equipments)
                {
                    foreach (var inspectionItem in equipment.InspectionItems)
                    {
                        var ids = inspectionItem.Choices.Select(x => x.ChoiceId);
                        var target = _context.Choices
                            .Where(x => x.InspectionItemId == inspectionItem.InspectionItemId)
                            .Where(x => !ids.Contains(x.ChoiceId));
                        _context.Choices.RemoveRange(target);
                    }
                }
            }
            else
            {
                throw new NullReferenceException(nameof(_context.Choices));
            }
        }
    }
}

//
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
                var entities = _context.InspectionSheets
                    .Select(x => _mapper.Map<InspectionSheetDto>(x))
                    .ToList();
                return entities;
            }
            else
            {
                return new List<InspectionSheetDto>();
            }
        }

        /// <inheritdoc/>
        public InspectionSheetDto? GetInspectionSheet(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var query = _context.InspectionSheets
                    .Where(s => s.SheetId == id)
                    .Include(s => s.InspectionGroup);
                System.Console.WriteLine(query.ToQueryString());
                var entity = query.Single<InspectionSheet>();
                var sheet = query.Select(s => new InspectionSheetDto
                {
                    SheetId = s.SheetId,
                    SheetName = s.SheetName,
                    InspectionGroup = s.InspectionGroup.Description,
                    InspectionType = s.InspectionType.Description,
                    Equipments = s.Equipments
                            .OrderBy(e => e.OrderIndex)
                            .Select(e => new EquipmentDto
                            {
                                EquipmentId = e.EquipmentId.ToString(),
                                EquipmentName = e.EquipmentName,
                                InspectionItems = e.InspectionItems
                                    .OrderBy(i => i.OrderIndex)
                                    .Select(i => new InspectionItemDto
                                    {
                                        InspectionItemId = i.InspectionItemId.ToString(),
                                        InspectionContent = i.InspectionContent,
                                        InputType = i.InputType.InputTypeId - 1,
                                        Choices = i.Choices
                                            .OrderBy(c => c.OrderIndex)
                                            .Select(c => c.Description)
                                            .ToList()
                                    })
                                    .ToList()
                            })
                            .ToList()
                })
                    .FirstOrDefault();
                return sheet;
            }
            else
            {
                return null;
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> CreateInspectionSheetAsync(InspectionSheetDto dto)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _mapper.Map<InspectionSheet>(dto);
                if (_context.InspectionTypes != null && _context.InspectionGroups != null)
                {
                    entity.InspectionGroup = _context.InspectionGroups
                        .Single(x => x.InspectionGroupId == entity.InspectionGroupId);
                    entity.InspectionType = _context.InspectionTypes
                        .Single(x => x.InspectionTypeId == entity.InspectionTypeId);
                }
                await _context.InspectionSheets.AddAsync(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDto>(entity);
            }
            else
            {
                return new InspectionSheetDto();
            }
        }

        /// <inheritdoc/>
        public InspectionSheetDto UpdateInspectionSheet(InspectionSheetDto dto)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public InspectionSheetDto DeleteInspectionSheet(int id)
        {
            if (InspectionSheetExists(id))
            {
                var dto = GetInspectionSheet(id);
                if (_context.InspectionSheets != null)
                {
                    var sheet = _context.InspectionSheets.Single(s => s.SheetId == id);
                    _context.Remove(sheet);
                    _context.SaveChanges();
                }
                return dto != null ? dto : new InspectionSheetDto();
            }
            else
            {
                return new InspectionSheetDto();
            }
        }
    }
}

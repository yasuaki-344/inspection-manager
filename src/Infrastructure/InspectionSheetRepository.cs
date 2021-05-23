//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Linq;
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
                var sheets = _context.InspectionSheets
                    .Include(s => s.InspectionGroup)
                    .Include(s => s.InspectionType)
                    .Select(s => new InspectionSheetDto
                    {
                        SheetId = s.SheetId,
                        SheetName = s.SheetName,
                        InspectionGroup = s.InspectionGroup.Description,
                        InspectionType = s.InspectionType.Description,
                    });
                return sheets;
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
        public InspectionSheetDto CreateInspectionSheet(InspectionSheetDto dto)
        {
            if (_context.InspectionSheets != null
                && _context.InspectionTypes != null
                && _context.InspectionGroups != null
                && _context.InputTypes != null
            )
            {
                var type = _context.InspectionTypes
                    .Single(x => x.Description == dto.InspectionType);
                var group = _context.InspectionGroups
                    .Single(x => x.Description == dto.InspectionGroup);
                var inputTypes = _context.InputTypes.ToList();
                var entity = new InspectionSheet
                {
                    SheetName = dto.SheetName,
                    InspectionTypeId = type.InspectionTypeId,
                    InspectionType = type,
                    InspectionGroupId = group.InspectionGroupId,
                    InspectionGroup = group,
                    Equipments = dto.Equipments.Select((e, i) => new Equipment
                    {
                        OrderIndex = i,
                        EquipmentName = e.EquipmentName,
                        InspectionItems = e.InspectionItems.Select((x, index) => new InspectionItem
                        {
                            OrderIndex = index,
                            InspectionContent = x.InspectionContent,
                            InputType = inputTypes.First(t => t.InputTypeId == x.InputType + 1),
                            Choices = x.Choices.Select((c, order) => new Choice
                            {
                                OrderIndex = order,
                                Description = c
                            }).ToList()
                        }).ToList()
                    }).ToList()
                };
                _context.InspectionSheets.Add(entity);
                _context.SaveChanges();
                return dto;
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

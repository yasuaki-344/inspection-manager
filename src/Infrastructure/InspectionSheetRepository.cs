using System;
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
        public bool IsValidInspectionSheet(InspectionSheetDto dto)
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
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> UpdateInspectionSheetAsync(InspectionSheetDto dto)
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
                _context.InspectionSheets.Update(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDto>(entity);
            }
            else
            {
                throw new NullReferenceException(nameof(_context.InspectionSheets));
            }
        }

        /// <inheritdoc/>
        public async Task DeleteInspectionSheetAsync(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _context.InspectionSheets
                    .Single(s => s.SheetId == id);
                if (entity != null)
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
    }
}

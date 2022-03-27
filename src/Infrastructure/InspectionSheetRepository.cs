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

namespace InspectionManager.Infrastructure;

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

    public string InspectionTypeName(int id) =>
        _context.InspectionTypes
            .AsNoTracking()
            .First(x => x.InspectionTypeId == id).Description;

    public string InspectionGroupName(int id) =>
        _context.InspectionGroups
            .AsNoTracking()
            .First(x => x.InspectionGroupId == id).Description;

    /// <inheritdoc/>
    public bool InspectionSheetExists(int id) =>
        _context.InspectionSheets
            .AsNoTracking()
            .Any(s => s.SheetId == id);

    /// <inheritdoc/>
    public IEnumerable<InspectionSheetDto> GetAllInspectionSheets() =>
        _context.InspectionSheets
            .AsNoTracking()
            .OrderBy(x => x.SheetId)
            .Select(x => _mapper.Map<InspectionSheetDto>(x))
            .ToList();

    /// <inheritdoc/>
    public InspectionSheetDto GetInspectionSheet(int id) =>
        _context.InspectionSheets
            .AsNoTracking()
            .Where(x => x.SheetId == id)
            .AsSplitQuery()
            .ProjectTo<InspectionSheetDto>(_mapper.ConfigurationProvider)
            .Single();

    /// <inheritdoc/>
    public bool IsValidInspectionSheet(InspectionSheetDto dto)
    {
        if (!_context.InspectionGroups.Any(x => x.InspectionGroupId == dto.InspectionGroupId))
        {
            return false;
        }

        if (!_context.InspectionTypes.Any(x => x.InspectionTypeId == dto.InspectionTypeId))
        {
            return false;
        }

        return true;
    }

    /// <inheritdoc/>
    public async Task<InspectionSheetDto> CreateInspectionSheetAsync(InspectionSheetDto dto)
    {
        var entity = _mapper.Map<InspectionSheet>(dto);

        await _context.InspectionSheets.AddAsync(entity);
        await _context.SaveChangesAsync();

        var result = _mapper.Map<InspectionSheetDto>(entity);
        return result;
    }

    /// <inheritdoc/>
    public async Task<InspectionSheetDto> UpdateInspectionSheetAsync(InspectionSheetDto dto)
    {
        var entity = await _context.InspectionSheets
            .Where(x => x.SheetId == dto.SheetId)
            .Include(x => x.Equipments)
            .ThenInclude(x => x.InspectionItems)
            .ThenInclude(x => x.Choices)
            .AsSplitQuery()
            .SingleAsync();

        if (entity is not null)
        {
            _mapper.Map(dto, entity);
            _context.InspectionSheets.Update(entity);
            await _context.SaveChangesAsync();
        }

        var result = _mapper.Map<InspectionSheetDto>(entity);
        return result;
    }

    /// <inheritdoc/>
    public async Task DeleteInspectionSheetAsync(int id)
    {
        var entity = await _context.InspectionSheets.FindAsync(id);
        if (entity is not null)
        {
            _context.InspectionSheets.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}

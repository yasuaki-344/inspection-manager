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
        var entity = _mapper.Map<InspectionSheet>(dto);
        RemoveUnusedRelationalEntities(entity);
        ReferRelationalEntities(entity);

        _context.InspectionSheets.Update(entity);
        await _context.SaveChangesAsync();

        var result = _mapper.Map<InspectionSheetDto>(entity);
        SortRelationalEntities(result);
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

    private static void SortRelationalEntities(InspectionSheetDto dto)
    {
        dto.Equipments = dto.Equipments.OrderBy(x => x.OrderIndex).ToArray();
        foreach (var equipment in dto.Equipments)
        {
            equipment.InspectionItems = equipment.InspectionItems
                .OrderBy(x => x.OrderIndex).ToList();
        }
    }

    private void ReferRelationalEntities(InspectionSheet entity)
    {
        entity.InspectionGroup = _context.InspectionGroups
            .First(x => x.InspectionGroupId == entity.InspectionGroupId);

        entity.InspectionType = _context.InspectionTypes
            .First(x => x.InspectionTypeId == entity.InspectionTypeId);

        foreach (var equipment in entity.Equipments)
        {
            foreach (var inspectionItem in equipment.InspectionItems)
            {
                inspectionItem.InputType = _context.InputTypes
                    .First(x => x.InputTypeId == inspectionItem.InputTypeId);
            }
        }
    }

    private void RemoveUnusedRelationalEntities(InspectionSheet entity)
    {
        {
            var ids = entity.Equipments.Select(x => x.EquipmentId);
            var target = _context.Equipments
                .Where(x => x.InspectionSheetId == entity.SheetId)
                .Where(x => !ids.Contains(x.EquipmentId));
            _context.Equipments.RemoveRange(target);
        }

        foreach (var equipment in entity.Equipments)
        {
            var ids = equipment.InspectionItems.Select(x => x.InspectionItemId);
            var target = _context.InspectionItems
                .Where(x => x.EquipmentId == equipment.EquipmentId)
                .Where(x => !ids.Contains(x.InspectionItemId));
            _context.InspectionItems.RemoveRange(target);
        }

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
}

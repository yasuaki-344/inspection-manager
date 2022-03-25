using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure;

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
    public bool InspectionGroupExists(int id) =>
        _context.InspectionGroups.Any(x => x.InspectionGroupId == id);

    /// <inheritdoc/>
    public IEnumerable<InspectionGroupDto> GetInspectionGroups() =>
        _context.InspectionGroups
            .ProjectTo<InspectionGroupDto>(_mapper.ConfigurationProvider)
            .ToList();

    /// <inheritdoc/>
    public InspectionGroupDto GetInspectionGroup(int id) =>
        _context.InspectionGroups
            .Where(x => x.InspectionGroupId == id)
            .ProjectTo<InspectionGroupDto>(_mapper.ConfigurationProvider)
            .Single();

    /// <inheritdoc/>
    public async Task<InspectionGroupDto> CreateInspectionGroupAsync(InspectionGroupDto dto)
    {
        var entity = _mapper.Map<InspectionGroup>(dto);
        await _context.InspectionGroups.AddAsync(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<InspectionGroupDto>(entity);
    }

    /// <inheritdoc/>
    public async Task<InspectionGroupDto> UpdateInspectionGroupAsync(InspectionGroupDto dto)
    {
        var entity = await _context.InspectionGroups.FindAsync(dto.InspectionGroupId);
        if (entity is not null)
        {
            _mapper.Map(dto, entity);
            _context.InspectionGroups.Update(entity);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<InspectionGroupDto>(entity);
    }

    /// <inheritdoc/>
    public async Task<InspectionGroupDto> DeleteInspectionGroupAsync(int id)
    {
        var entity = await _context.InspectionGroups.FindAsync(id);
        if (entity is not null)
        {
            _context.InspectionGroups.Remove(entity);
            await _context.SaveChangesAsync();
        }
        return _mapper.Map<InspectionGroupDto>(entity);
    }

    /// <inheritdoc/>
    public bool InspectionTypeExists(int id) =>
        _context.InspectionTypes.Any(x => x.InspectionTypeId == id);

    /// <inheritdoc/>
    public IEnumerable<InspectionTypeDto> GetInspectionTypes() =>
        _context.InspectionTypes
            .ProjectTo<InspectionTypeDto>(_mapper.ConfigurationProvider)
            .ToList();

    /// <inheritdoc/>
    public InspectionTypeDto GetInspectionType(int id) =>
        _context.InspectionTypes
            .Where(x => x.InspectionTypeId == id)
            .ProjectTo<InspectionTypeDto>(_mapper.ConfigurationProvider)
            .Single();

    /// <inheritdoc/>
    public async Task<InspectionTypeDto> CreateInspectionTypeAsync(InspectionTypeDto dto)
    {
        var entity = _mapper.Map<InspectionType>(dto);
        await _context.InspectionTypes.AddAsync(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<InspectionTypeDto>(entity);
    }

    /// <inheritdoc/>
    public async Task<InspectionTypeDto> UpdateInspectionTypeAsync(InspectionTypeDto dto)
    {
        var entity = await _context.InspectionTypes.FindAsync(dto.InspectionTypeId);
        if (entity is not null)
        {
            _mapper.Map(dto, entity);
            _context.InspectionTypes.Update(entity);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<InspectionTypeDto>(entity);
    }


    /// <inheritdoc/>
    public async Task<InspectionTypeDto> DeleteInspectionTypeAsync(int id)
    {
        var entity = await _context.InspectionTypes.FindAsync(id);
        if (entity is not null)
        {
            _context.InspectionTypes.Remove(entity);
            await _context.SaveChangesAsync();
        }
        return _mapper.Map<InspectionTypeDto>(entity);
    }

    /// <inheritdoc/>
    public bool ChoiceTemplateExists(int id) =>
        _context.ChoiceTemplates.Any(x => x.ChoiceTemplateId == id);

    /// <inheritdoc/>
    public IEnumerable<ChoiceTemplateDto> GetChoiceTemplates() =>
        _context.ChoiceTemplates
            .ProjectTo<ChoiceTemplateDto>(_mapper.ConfigurationProvider)
            .ToList();

    /// <inheritdoc/>
    public ChoiceTemplateDto GetChoiceTemplate(int id) =>
        _context.ChoiceTemplates
            .Where(x => x.ChoiceTemplateId == id)
            .ProjectTo<ChoiceTemplateDto>(_mapper.ConfigurationProvider)
            .Single();

    /// <inheritdoc/>
    public async Task<ChoiceTemplateDto> CreateChoiceTemplateAsync(ChoiceTemplateDto dto)
    {
        var entity = _mapper.Map<ChoiceTemplate>(dto);
        await _context.ChoiceTemplates.AddAsync(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<ChoiceTemplateDto>(entity);
    }

    /// <inheritdoc/>
    public async Task<ChoiceTemplateDto> UpdateChoiceTemplateAsync(ChoiceTemplateDto dto)
    {
        var entity = await _context.ChoiceTemplates.FindAsync(dto.ChoiceTemplateId);
        if (entity is not null)
        {
            _mapper.Map(dto, entity);
            _context.ChoiceTemplates.Update(entity);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<ChoiceTemplateDto>(entity);
    }

    /// <inheritdoc/>
    public async Task<ChoiceTemplateDto> DeleteChoiceTemplateAsync(int id)
    {
        var entity = await _context.ChoiceTemplates.FindAsync(id);

        if (entity is not null)
        {
            _context.ChoiceTemplates.Remove(entity);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<ChoiceTemplateDto>(entity);
    }
}

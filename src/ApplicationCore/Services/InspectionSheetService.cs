using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace InspectionManager.ApplicationCore.Services;

public class InspectionSheetService : IInspectionSheetService
{
    private readonly IInspectionSheetRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<InspectionSheetService> _logger;

    /// <summary>
    /// Initializes a new instace of InspectionSheetService class.
    /// </summary>
    /// <param name="repository">Inspection data access object</param>
    /// <param name="mapper">Auto mapper object</param>
    /// <param name="logger">logger object</param>
    public InspectionSheetService(
        IInspectionSheetRepository repository,
        IMapper mapper,
        ILogger<InspectionSheetService> logger
    )
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    /// <inheritdoc/>
    public bool InspectionSheetExists(int id) =>
        _repository.InspectionSheetExists(id);

    /// <inheritdoc/>
    public IEnumerable<InspectionSheetDto> GetAllInspectionSheets() =>
        _repository.GetAllInspectionSheets();

    /// <inheritdoc/>
    public InspectionSheetDetailDto GetInspectionSheet(int id) =>
        _repository.GetInspectionSheet(id);

    /// <inheritdoc/>
    public bool IsValidInspectionSheet(InspectionSheetDetailDto dto) =>
        _repository.IsValidInspectionSheet(dto);

    /// <inheritdoc/>
    public async Task<InspectionSheetDetailDto> CreateInspectionSheetAsync(InspectionSheetDetailDto dto) =>
        await _repository.CreateInspectionSheetAsync(dto);

    /// <inheritdoc/>
    public async Task<InspectionSheetDetailDto> UpdateInspectionSheetAsync(InspectionSheetDetailDto dto) =>
        await _repository.UpdateInspectionSheetAsync(dto);

    /// <inheritdoc/>
    public async Task DeleteInspectionSheetAsync(int id) =>
        await _repository.DeleteInspectionSheetAsync(id);
}

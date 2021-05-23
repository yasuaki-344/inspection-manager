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
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace InspectionManager.ApplicationCore.Services
{
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
            _repository.GetAllInspectionSheets()
                .OrderBy(x => x.SheetName)
                .ThenBy(x => x.InspectionGroupId)
                .ThenBy(x => x.InspectionTypeId);

        /// <inheritdoc/>
        public InspectionSheetDto? GetInspectionSheet(int id) =>
            _repository.GetInspectionSheet(id);

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> CreateInspectionSheetAsync(InspectionSheetDto dto) =>
            await _repository.CreateInspectionSheetAsync(dto);

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> UpdateInspectionSheetAsync(InspectionSheetDto dto) =>
            await _repository.UpdateInspectionSheetAsync(dto);

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> DeleteInspectionSheetAsync(int id) =>
            await _repository.DeleteInspectionSheetAsync(id);
    }
}

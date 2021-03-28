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
        public bool InspectionSheetExists(string id) =>
            _repository.InspectionSheetExists(id);

        /// <inheritdoc/>
        public IEnumerable<InspectionSheetSummaryDto> GetAllInspectionSheets() =>
            _mapper.Map<IEnumerable<InspectionSheetSummaryDto>>(
                _repository.GetAllInspectionSheets()
            )
            .OrderBy(x => x.SheetName)
            .ThenBy(x => x.InspectionGroup)
            .ThenBy(x => x.InspectionType);

        /// <inheritdoc/>
        public InspectionSheetDto? GetInspectionSheet(string id) =>
            _repository.GetInspectionSheet(id);

        /// <inheritdoc/>
        public InspectionSheetDto CreateInspectionSheet(InspectionSheetDto dto) =>
            _repository.CreateInspectionSheet(dto);

        /// <inheritdoc/>
        public InspectionSheetDto UpdateInspectionSheet(InspectionSheetDto dto) =>
            _repository.UpdateInspectionSheet(dto);

        /// <inheritdoc/>
        public InspectionSheetDto DeleteInspectionSheet(string id) =>
            _repository.DeleteInspectionSheet(id);
    }
}

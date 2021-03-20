//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System.Collections.Generic;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace InspectionManager.ApplicationCore.Services
{
    public class InspectionSheetService : IInspectionSheetService
    {
        private readonly IInspectionSheetRepository _repository;
        private readonly ILogger<InspectionSheetService> _logger;

        /// <summary>
        /// Initializes a new instace of InspectionSheetService class.
        /// </summary>
        /// <param name="repository">Inspection data access object</param>
        /// <param name="logger">logger object</param>
        public InspectionSheetService(
            IInspectionSheetRepository repository,
            ILogger<InspectionSheetService> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        /// <inheritdoc/>
        public bool InspectionSheetExists(string id) =>
            _repository.InspectionSheetExists(id);

        /// <inheritdoc/>
        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets() =>
            _repository.GetAllInspectionSheets();

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

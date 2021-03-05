//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace InspectionManager.ApplicationCore.Services
{
    public class InspectionSheetService : IInspectionSheetService
    {
        private readonly IInspectionSheetRepository _repository;
        private readonly ILogger<InspectionSheetService> _logger;

        public InspectionSheetService(
            IInspectionSheetRepository repository,
            ILogger<InspectionSheetService> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        public void CreateInspectionSheet(InspectionSheetDto dto) =>
            _repository.CreateInspectionSheet(dto);
    }
}

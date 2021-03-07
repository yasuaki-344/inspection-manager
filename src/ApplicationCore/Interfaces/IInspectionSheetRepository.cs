//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using InspectionManager.ApplicationCore.Dto;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface IInspectionSheetRepository
    {
        IEnumerable<InspectionSheetDto> GetAllInspectionSheets();
        InspectionSheetDto? GetInspectionSheet(string id);
        InspectionSheetDto CreateInspectionSheet(InspectionSheetDto dto);
        InspectionSheetDto UpdateInspectionSheet(InspectionSheetDto dto);
        InspectionSheetDto? DeleteInspectionSheet(string id);
    }
}

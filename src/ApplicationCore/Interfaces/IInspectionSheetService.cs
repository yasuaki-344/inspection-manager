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
    public interface IInspectionSheetService
    {
        IEnumerable<InspectionSheetDto> GetAllInspectionSheets();
        void CreateInspectionSheet(InspectionSheetDto dto);
    }
}

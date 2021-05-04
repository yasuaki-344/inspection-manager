//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;

namespace InspectionManager.Infrastructure
{
    public class InspectionSheetPostgreRepository : IInspectionSheetRepository
    {
        /// <summary>
        /// Initializes a new instance of InspectionSheetPostgreRepository class.
        /// </summary>
        public InspectionSheetPostgreRepository()
        {
        }

        /// <inheritdoc/>
        public bool InspectionSheetExists(string id)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets()
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public InspectionSheetDto? GetInspectionSheet(string id)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public InspectionSheetDto CreateInspectionSheet(InspectionSheetDto dto)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public InspectionSheetDto UpdateInspectionSheet(InspectionSheetDto dto)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc/>
        public InspectionSheetDto DeleteInspectionSheet(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}

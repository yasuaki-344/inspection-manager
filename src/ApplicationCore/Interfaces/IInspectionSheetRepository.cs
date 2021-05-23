//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface IInspectionSheetRepository
    {
        /// <summary>
        /// Checks if the specified inspection sheet exists.
        /// </summary>
        /// <param name="id">Sheet ID to be checked</param>
        /// <returns>Return True if exist, otherwise false.</returns>
        bool InspectionSheetExists(int id);

        /// <summary>
        /// Gets all inspection sheets from database.
        /// </summary>
        /// <returns>All inspection sheets</returns>
        IEnumerable<InspectionSheetDto> GetAllInspectionSheets();

        /// <summary>
        /// Gets the specified inspection sheet data from database.
        /// </summary>
        /// <param name="id">The ID of inspection sheet to be gotton</param>
        /// <returns>The inspection sheet of the specified ID</returns>
        InspectionSheetDto? GetInspectionSheet(int id);

        /// <summary>
        /// Creates new inspection sheet by using the specified InspectionSheetDto.
        /// </summary>
        /// <param name="dto">Inspection sheet data to be created</param>
        /// <returns>Created inspection sheet data</returns>
        Task<InspectionSheetDto> CreateInspectionSheetAsync(InspectionSheetDto dto);

        /// <summary>
        /// Updates the specified inspection sheet data.
        /// </summary>
        /// <param name="dto">Inspection sheet data for update</param>
        /// <returns>Updated inspection sheet data</returns>
        InspectionSheetDto UpdateInspectionSheet(InspectionSheetDto dto);

        /// <summary>
        /// Deletes the specified inspection sheet data.
        /// </summary>
        /// <param name="id">Sheet ID to be deleted</param>
        /// <returns>Deleted inspection sheet data</returns>
        InspectionSheetDto DeleteInspectionSheet(int id);
    }
}

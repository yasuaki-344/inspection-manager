using System.Collections.Generic;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface IInspectionSheetService
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
        /// <returns>Return The inspection sheet of the specified ID if exist, otherwise null</returns>
        InspectionSheetDetailDto? GetInspectionSheet(int id);

        /// <summary>
        /// Checks if the specified inspection sheet is valid.
        /// </summary>
        /// <param name="dto">Inspection sheet to be checked</param>
        /// <returns>Returns true if sheet is valid, otherwise false</returns>
        bool IsValidInspectionSheet(InspectionSheetDto dto);

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
        Task<InspectionSheetDto> UpdateInspectionSheetAsync(InspectionSheetDto dto);

        /// <summary>
        /// Deletes the specified inspection sheet data.
        /// </summary>
        /// <param name="id">Sheet ID to be deleted</param>
        /// <returns>Deleted inspection sheet data</returns>
        Task DeleteInspectionSheetAsync(int id);
    }
}

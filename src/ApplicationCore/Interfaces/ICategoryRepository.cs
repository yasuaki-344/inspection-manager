using System.Collections.Generic;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface ICategoryRepository
    {
        /// <summary>
        /// Checks if the specified inspection group exists.
        /// </summary>
        /// <param name="id">Group ID to be checked</param>
        /// <returns>Return True if exist, otherwise false.</returns>
        bool InspectionGroupExists(int id);

        /// <summary>
        /// Pulls inspection groups from database.
        /// </summary>
        /// <returns>Inspection group list</returns>
        IEnumerable<InspectionGroupDto> GetInspectionGroups();

        /// <summary>
        /// Gets the specified inspection group data from database.
        /// </summary>
        /// <param name="id">The ID of inspection group to be gotton</param>
        /// <returns>The inspection group of the specified ID</returns>
        InspectionGroupDto GetInspectionGroup(int id);

        /// <summary>
        /// Creates new inspection group by using the specified InspectionGroupDto.
        /// </summary>
        /// <param name="dto">Inspection group data to be created</param>
        /// <returns>Created inspection group data</returns>
        Task<InspectionGroupDto> CreateInspectionGroupAsync(InspectionGroupDto dto);

        /// <summary>
        /// Updates the specified inspection group data.
        /// </summary>
        /// <param name="dto">Inspection group data for update</param>
        /// <returns>Updated inspection group data</returns>
        Task<InspectionGroupDto> UpdateInspectionGroupAsync(InspectionGroupDto dto);

        /// <summary>
        /// Deletes the specified inspection group data.
        /// </summary>
        /// <param name="id">Group ID to be deleted</param>
        /// <returns>Deleted inspection group data</returns>
        Task<InspectionGroupDto> DeleteInspectionGroupAsync(int id);

        /// <summary>
        /// Checks if the specified inspection type exists.
        /// </summary>
        /// <param name="id">Type ID to be checked</param>
        /// <returns>Return True if exist, otherwise false.</returns>
        bool InspectionTypeExists(int id);

        /// <summary>
        /// Pulls inspection types from database.
        /// </summary>
        /// <returns>Inspection type list</returns>
        IEnumerable<InspectionTypeDto> GetInspectionTypes();

        /// <summary>
        /// Gets the specified inspection type data from database.
        /// </summary>
        /// <param name="id">The ID of inspection type to be gotton</param>
        /// <returns>The inspection type of the specified ID</returns>
        InspectionTypeDto GetInspectionType(int id);

        /// <summary>
        /// Creates new inspection type by using the specified InspectionTypeDto.
        /// </summary>
        /// <param name="dto">Inspection type data to be created</param>
        /// <returns>Created inspection type data</returns>
        Task<InspectionTypeDto> CreateInspectionTypeAsync(InspectionTypeDto dto);

        /// <summary>
        /// Updates the specified inspection type data.
        /// </summary>
        /// <param name="dto">Inspection type data for update</param>
        /// <returns>Updated inspection type data</returns>
        Task<InspectionTypeDto> UpdateInspectionTypeAsync(InspectionTypeDto dto);

        /// <summary>
        /// Deletes the specified inspection type data.
        /// </summary>
        /// <param name="id">Type ID to be deleted</param>
        /// <returns>Deleted entity</returns>
        Task<InspectionTypeDto> DeleteInspectionTypeAsync(int id);

        /// <summary>
        /// Checks if the specified choice template exists.
        /// </summary>
        /// <param name="id">Choice template ID to be checked</param>
        /// <returns>Return True if exist, otherwise false.</returns>
        bool ChoiceTemplateExists(int id);

        /// <summary>
        /// Pulls choice templates types from database.
        /// </summary>
        /// <returns>Choice templates list</returns>
        IEnumerable<ChoiceTemplateDto> GetChoiceTemplates();

        /// <summary>
        /// Gets the specified choice template data from database.
        /// </summary>
        /// <param name="id">The ID of choice template to be gotton</param>
        /// <returns>The choice template of the specified ID</returns>
        ChoiceTemplateDto GetChoiceTemplate(int id);

        /// <summary>
        /// Creates new choice template by using the specified ChoiceTemplateDto.
        /// </summary>
        /// <param name="dto">Choice template data to be created</param>
        /// <returns>Created choice template data</returns>
        Task<ChoiceTemplateDto> CreateChoiceTemplateAsync(ChoiceTemplateDto dto);

        /// <summary>
        /// Updates the specified choice template data.
        /// </summary>
        /// <param name="dto">Choice template data for update</param>
        /// <returns>Updated choice template data</returns>
        Task<ChoiceTemplateDto> UpdateChoiceTemplateAsync(ChoiceTemplateDto dto);

        /// <summary>
        /// Deletes the specified choice template data.
        /// </summary>
        /// <param name="id">Choice template ID to be deleted</param>
        /// <returns></returns>
        Task DeleteChoiceTemplateAsync(int id);
    }
}

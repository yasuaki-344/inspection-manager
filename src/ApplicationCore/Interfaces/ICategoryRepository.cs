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
        InspectionGroupDto? GetInspectionGroup(int id);

        /// <summary>
        /// Creates new inspection group by using the specified InspectionGroupDto.
        /// </summary>
        /// <param name="dto">Inspection group data to be created</param>
        /// <returns>Created inspection group data</returns>
        InspectionGroupDto CreateInspectionGroup(InspectionGroupDto dto);

        /// <summary>
        /// Pulls inspection types from database.
        /// </summary>
        /// <returns>Inspection type list</returns>
        string[] GetInspectionTypes();

        /// <summary>
        /// Pushes inspection types to database.
        /// </summary>
        /// <param name="types">Inspection types to be pushed.</param>
        /// <returns>Registered inspection types</returns>
        string[] CreateInspectionTypes(string[] types);

        /// <summary>
        /// Pulls choice templates types from database.
        /// </summary>
        /// <returns>Choice templates list</returns>
        IEnumerable<ChoiceTemplateDto> GetChoiceTemplates();

        /// <summary>
        /// Pushes choice templates to database.
        /// </summary>
        /// <param name="types">Choice templates to be pushed.</param>
        /// <returns>Registered choice templates</returns>
        IEnumerable<ChoiceTemplateDto> CreateChoiceTemplates(
            IEnumerable<ChoiceTemplateDto> templates
        );
    }
}

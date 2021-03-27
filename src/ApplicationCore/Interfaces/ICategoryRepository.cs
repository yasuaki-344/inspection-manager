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
        /// Pulls inspection groups from database.
        /// </summary>
        /// <returns>Inspection group list</returns>
        string[] GetInspectionGroups();

        /// <summary>
        /// Pushes inspection groups database.
        /// </summary>
        /// <param name="groups">Inspection groups to be pushed.</param>
        /// <returns>Registered inspection groups</returns>
        string[] CreateInspectionGroups(string[] groups);

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

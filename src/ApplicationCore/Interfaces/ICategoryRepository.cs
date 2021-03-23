//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface ICategoryRepository
    {
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        string[] GetInspectionGroups();

        /// <summary>
        ///
        /// </summary>
        /// <param name="groups"></param>
        /// <returns></returns>
        string[] CreateInspectionGroups(string[] groups);
    }
}

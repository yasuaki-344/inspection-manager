//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents Choice entity
    /// </summary>
    public class Choice
    {
        public int ChoiceId { get; set; }
        public int OrderIndex { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}

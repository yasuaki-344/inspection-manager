//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents input type entity
    /// </summary>
    public class InputType
    {
        public int InputTypeId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}

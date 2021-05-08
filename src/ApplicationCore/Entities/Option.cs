//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Represents option entity
    /// </summary>
    public class Option
    {
        public int OptionId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ChoiceTemplateId { get; set; } = string.Empty;
        public ChoiceTemplate ChoiceTemplate { get; set; } = new ChoiceTemplate();
    }
}

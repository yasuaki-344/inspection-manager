//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Choice set template data structure
    /// </summary>
    public class ChoiceTemplate
    {
        public int ChoiceTemplateId { get; set; }
        public ICollection<Option> Choices { get; set; } = new List<Option>();
    }
}

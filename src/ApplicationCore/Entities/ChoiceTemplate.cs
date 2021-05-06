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
        public int Id { get; set; }
        public string ChoiceTemplateId { get; set; } = string.Empty;
        public List<Option> Choices { get; set; } = new List<Option>();
    }
}

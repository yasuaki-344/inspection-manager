//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
namespace InspectionManager.ApplicationCore.Entities
{
    /// <summary>
    /// Choice set template data structure
    /// </summary>
    public class Choice
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}

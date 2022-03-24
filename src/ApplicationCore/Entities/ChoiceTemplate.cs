using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Choice set template data structure
/// </summary>
public class ChoiceTemplate
{
    public int ChoiceTemplateId { get; set; }
    public ICollection<Option> Choices { get; set; } = new List<Option>();
}

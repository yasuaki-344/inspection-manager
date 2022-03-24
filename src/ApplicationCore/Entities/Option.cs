namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents option entity
/// </summary>
public class Option
{
    public int OptionId { get; set; }
    public string Description { get; set; } = string.Empty;
    public int ChoiceTemplateId { get; set; }
    public ChoiceTemplate ChoiceTemplate { get; set; } = null!;
}

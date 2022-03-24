namespace InspectionManager.ApplicationCore.Entities;

/// <summary>
/// Represents Choice entity
/// </summary>
public class Choice
{
    public int ChoiceId { get; set; }
    public int OrderIndex { get; set; }
    public string Description { get; set; } = string.Empty;
    public int InspectionItemId { get; set; }
    public InspectionItem InspectionItem { get; set; } = new InspectionItem();
}

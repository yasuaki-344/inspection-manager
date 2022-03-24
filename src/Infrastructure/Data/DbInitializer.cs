using System;
using System.Collections.Generic;
using System.Linq;
using InspectionManager.ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace InspectionManager.Infrastructure.Data;

public static class DbInitializer
{
    public static void Seed(IServiceProvider serviceProvider)
    {
        using var context = new InspectionContext(
           serviceProvider.GetRequiredService<DbContextOptions<InspectionContext>>());
        {
            context.Database.EnsureCreated();
            if (context.InputTypes is not null)
            {
                if (!context.InputTypes.Any())
                {
                    context.InputTypes.AddRange(
                        new InputType { InputTypeId = 1, Description = "テキスト入力" },
                        new InputType { InputTypeId = 2, Description = "数値入力" },
                        new InputType { InputTypeId = 3, Description = "項目選択" },
                        new InputType { InputTypeId = 6, Description = "日付入力" }
                    );
                }
                context.SaveChanges();
            }
            if (context.ChoiceTemplates is not null)
            {
                if (!context.ChoiceTemplates.Any())
                {
                    context.ChoiceTemplates.Add(new ChoiceTemplate
                    {
                        Choices = new List<Option>
                                {
                                    new Option { Description = "選択肢1" },
                                    new Option { Description = "選択肢2" },
                                }
                    });
                    context.SaveChanges();
                }
            }
            if (context.InspectionSheets is not null && context.InputTypes is not null)
            {
                if (!context.InspectionSheets.Any())
                {
                    context.InspectionSheets.Add(new InspectionSheet
                    {
                        SheetName = "example",
                        InspectionTypeId = 1,
                        InspectionType = new InspectionType { InspectionTypeId = 1, Description = "type" },
                        InspectionGroupId = 1,
                        InspectionGroup = new InspectionGroup { InspectionGroupId = 1, Description = "group" },
                        Equipments = new List<Equipment>
                                {
                                    new Equipment
                                    {
                                        OrderIndex = 0,
                                        EquipmentName = "機器1",
                                        InspectionItems = new List<InspectionItem>
                                        {
                                            new InspectionItem
                                            {
                                                OrderIndex = 0,
                                                InspectionContent = "テキスト入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("テキスト入力"))
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 1,
                                                InspectionContent = "数値入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("数値入力"))
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 2,
                                                InspectionContent = "項目選択",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("項目選択")),
                                                Choices = new List<Choice>
                                                {
                                                    new Choice
                                                    {
                                                        OrderIndex = 0,
                                                        Description = "OK"
                                                    },
                                                    new Choice
                                                    {
                                                        OrderIndex = 1,
                                                        Description = "NG"
                                                    }

                                                }
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 3,
                                                InspectionContent = "日付入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("日付入力"))
                                            }
                                        }
                                    },
                                    new Equipment
                                    {
                                        OrderIndex = 1,
                                        EquipmentName = "機器2",
                                        InspectionItems = new List<InspectionItem>
                                        {
                                            new InspectionItem
                                            {
                                                OrderIndex = 0,
                                                InspectionContent = "テキスト入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("テキスト入力"))
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 1,
                                                InspectionContent = "数値入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("数値入力"))
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 2,
                                                InspectionContent = "項目選択",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("項目選択")),
                                                Choices = new List<Choice>
                                                {
                                                    new Choice
                                                    {
                                                        OrderIndex = 0,
                                                        Description = "異常あり"
                                                    },
                                                    new Choice
                                                    {
                                                        OrderIndex = 1,
                                                        Description = "異常なし"
                                                    }
                                                }
                                            },
                                            new InspectionItem
                                            {
                                                OrderIndex = 3,
                                                InspectionContent = "日付入力",
                                                InputType = context.InputTypes.Single(x => x.Description.Equals("日付入力"))
                                            }
                                        }
                                    },
                                }
                    });
                }
                context.SaveChanges();
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Services;
using Xunit;

namespace InspectionManager.ApplicationCore.Test;

public class AutoMappingTest
{
    [Fact]
    public void MapChoiceDtoToStringCorrectly()
    {
        var expect = new ChoiceDto
        {
            Description = "foo"
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<string>(expect);
        Assert.Equal(expect.Description, actual);
    }

    [Fact]
    public void MapToInspectionItemExportDtoCorrectly()
    {
        var expect = new InspectionItemDto
        {
            InspectionItemId = 1,
            InspectionContent = "content",
            InputTypeId = 3,
            Choices = new List<ChoiceDto>
                {
                    new ChoiceDto { Description = "foo"},
                    new ChoiceDto { Description = "var"},
                    new ChoiceDto { Description = "hoge"}
                },
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionItemExportDto>(expect);
        Assert.Equal(expect.InspectionItemId, actual.InspectionItemId);
        Assert.Equal(expect.InspectionContent, actual.InspectionContent);
        Assert.Equal(expect.InputTypeId - 1, actual.InputMethod);
        Assert.Equal(expect.Choices[0].Description, actual.Choices[0]);
        Assert.Equal(expect.Choices[1].Description, actual.Choices[1]);
        Assert.Equal(expect.Choices[2].Description, actual.Choices[2]);
        Assert.Empty(actual.Transitions);
    }

    [Fact]
    public void MapToEquipmentExportDtoCorrectly()
    {
        var expect = new EquipmentDto
        {
            EquipmentId = 10,
            EquipmentName = "equipment",
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<EquipmentExportDto>(expect);
        Assert.Equal(expect.EquipmentId.ToString(), actual.EquipmentId);
        Assert.Equal(expect.EquipmentName, actual.EquipmentName);
    }

    [Fact]
    public void MapToInspectionSheetExportDtoCorrectly()
    {
        var expect = new InspectionSheetDetailDto
        {
            SheetId = 11,
            SheetName = "sheet name",
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionSheetExportDto>(expect);
        Assert.Equal(expect.SheetId.ToString(), actual.SheetId);
        Assert.Equal(expect.SheetName, actual.SheetName);
    }

    [Fact]
    public void MapToChoiceTemplateDtoCorrectly()
    {
        var item = new ChoiceTemplate
        {
            ChoiceTemplateId = 10,
            Choices = new List<Option>
                {
                    new Option { OptionId= 1, Description = "option 1" },
                    new Option { OptionId= 5, Description = "option 2" },
                }
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<ChoiceTemplateDto>(item);
        Assert.Equal(10, actual.ChoiceTemplateId);
        Assert.Equal(1, actual.Choices[0].OptionId);
        Assert.Equal("option 1", actual.Choices[0].Description);
        Assert.Equal(5, actual.Choices[1].OptionId);
        Assert.Equal("option 2", actual.Choices[1].Description);
    }

    [Fact]
    public void MapInspectionSheetEntityToDtoCorrectly()
    {
        var entity = new InspectionSheet
        {
            SheetId = 1,
            SheetName = "sheet name",
            InspectionTypeId = 10,
            InspectionType = new InspectionType
            {
                Description = "type"
            },
            InspectionGroupId = 20,
            InspectionGroup = new InspectionGroup
            {
                Description = "group"
            }
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionSheetDto>(entity);
        Assert.Equal(entity.SheetId, actual.SheetId);
        Assert.Equal(entity.SheetName, actual.SheetName);
        Assert.Equal(entity.InspectionTypeId, actual.InspectionTypeId);
        Assert.Equal(entity.InspectionType.Description, actual.InspectionType);
        Assert.Equal(entity.InspectionGroupId, actual.InspectionGroupId);
        Assert.Equal(entity.InspectionGroup.Description, actual.InspectionGroup);
    }

    [Fact]
    public void MapInspectionSheetEntityToDetailDtoCorrectly()
    {
        var entity = new InspectionSheet
        {
            SheetId = 1,
            SheetName = "sheet name",
            InspectionTypeId = 10,
            InspectionGroupId = 20,
            Equipments = new List<Equipment>
                {
                    new Equipment
                    {
                        EquipmentId = 2,
                        OrderIndex = 30,
                        EquipmentName = "equipment",
                        InspectionItems = new List<InspectionItem>
                        {
                            new InspectionItem
                            {
                                InspectionItemId = 3,
                                OrderIndex = 40,
                                InspectionContent = "inspection",
                                InputTypeId = 4,
                                Choices = new List<Choice>
                                {
                                    new Choice
                                    {
                                        ChoiceId = 5,
                                        OrderIndex = 50,
                                        Description = "choice"
                                    }
                                }
                            }
                        }
                    }
                }
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionSheetDetailDto>(entity);
        Assert.Equal(entity.SheetId, actual.SheetId);
        Assert.Equal(entity.SheetName, actual.SheetName);
        Assert.Equal(entity.InspectionTypeId, actual.InspectionTypeId);
        Assert.Equal(entity.InspectionGroupId, actual.InspectionGroupId);

        var expectEquipment = entity.Equipments.First();
        var actualEquipment = actual.Equipments.First();
        Assert.Equal(expectEquipment.EquipmentId, actualEquipment.EquipmentId);
        Assert.Equal(expectEquipment.OrderIndex, actualEquipment.OrderIndex);
        Assert.Equal(expectEquipment.EquipmentName, actualEquipment.EquipmentName);

        var expectInspectionItem = expectEquipment.InspectionItems.First();
        var actualInspectionItem = actualEquipment.InspectionItems.First();
        Assert.Equal(expectInspectionItem.InspectionItemId, actualInspectionItem.InspectionItemId);
        Assert.Equal(expectInspectionItem.OrderIndex, actualInspectionItem.OrderIndex);
        Assert.Equal(expectInspectionItem.InspectionContent, actualInspectionItem.InspectionContent);
        Assert.Equal(expectInspectionItem.InputTypeId, actualInspectionItem.InputTypeId);

        var expectChoice = expectInspectionItem.Choices.First();
        var actualChoice = actualInspectionItem.Choices.First();
        Assert.Equal(expectChoice.ChoiceId, actualChoice.ChoiceId);
        Assert.Equal(expectChoice.OrderIndex, actualChoice.OrderIndex);
        Assert.Equal(expectChoice.Description, actualChoice.Description);
    }

    [Fact]
    public void MapInspectionSheetDetailDtoToEntityCorrectly()
    {
        var dto = new InspectionSheetDetailDto
        {
            SheetId = 1,
            SheetName = "sheet name",
            InspectionTypeId = 10,
            InspectionGroupId = 20,
            Equipments = new List<EquipmentDto>
                {
                    new EquipmentDto
                    {
                        EquipmentId = 2,
                        EquipmentName = "equipment",
                        InspectionItems = new List<InspectionItemDto>
                        {
                            new InspectionItemDto
                            {
                                InspectionItemId = 3,
                                InspectionContent = "inspection",
                                InputTypeId = 4,
                                Choices = new List<ChoiceDto>
                                {
                                    new ChoiceDto
                                    {
                                        ChoiceId = 5,
                                        Description = "choice"
                                    }
                                }
                            }
                        }
                    }
                }
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionSheet>(dto);
        Assert.Equal(dto.SheetId, actual.SheetId);
        Assert.Equal(dto.SheetName, actual.SheetName);
        Assert.Equal(dto.InspectionTypeId, actual.InspectionTypeId);
        Assert.Equal(dto.InspectionGroupId, actual.InspectionGroupId);

        var expectEquipment = dto.Equipments.First();
        var actualEquipment = actual.Equipments.First();
        Assert.Equal(expectEquipment.EquipmentId, actualEquipment.EquipmentId);
        Assert.Equal(expectEquipment.EquipmentName, actualEquipment.EquipmentName);

        var expectInspectionItem = expectEquipment.InspectionItems.First();
        var actualInspectionItem = actualEquipment.InspectionItems.First();
        Assert.Equal(expectInspectionItem.InspectionItemId, actualInspectionItem.InspectionItemId);
        Assert.Equal(expectInspectionItem.InspectionContent, actualInspectionItem.InspectionContent);
        Assert.Equal(expectInspectionItem.InputTypeId, actualInspectionItem.InputTypeId);

        var expectChoice = expectInspectionItem.Choices.First();
        var actualChoice = actualInspectionItem.Choices.First();
        Assert.Equal(expectChoice.ChoiceId, actualChoice.ChoiceId);
        Assert.Equal(expectChoice.Description, actualChoice.Description);
    }

    [Fact]
    public void MapToEquipmentDtoCorrectly()
    {
        var expect = new Equipment
        {
            EquipmentId = 1,
            OrderIndex = 4,
            EquipmentName = "equipment name",
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<EquipmentDto>(expect);
        Assert.Equal(expect.EquipmentId, actual.EquipmentId);
        Assert.Equal(expect.OrderIndex, actual.OrderIndex);
        Assert.Equal(expect.EquipmentName, actual.EquipmentName);
    }

    [Fact]
    public void MapToInspectionItemDtoCorrectly()
    {
        var expect = new InspectionItem
        {
            InspectionItemId = 11,
            OrderIndex = 3,
            InspectionContent = "inspection content",
            InputTypeId = 2,
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<InspectionItemDto>(expect);
        Assert.Equal(expect.InspectionItemId, actual.InspectionItemId);
        Assert.Equal(expect.OrderIndex, actual.OrderIndex);
        Assert.Equal(expect.InspectionContent, actual.InspectionContent);
        Assert.Equal(expect.InputTypeId, actual.InputTypeId);
    }

    [Fact]
    public void MapToChoiceDtoCorrectly()
    {
        var expect = new Choice
        {
            ChoiceId = 3,
            OrderIndex = 1,
            Description = "choice"
        };
        var mapper = CreateMapper();
        var actual = mapper.Map<ChoiceDto>(expect);
        Assert.Equal(expect.ChoiceId, actual.ChoiceId);
        Assert.Equal(expect.OrderIndex, actual.OrderIndex);
        Assert.Equal(expect.Description, actual.Description);
    }

    private static Mapper CreateMapper()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<AutoMapping>();
        });
        var mapper = new Mapper(config);
        return mapper;
    }
}

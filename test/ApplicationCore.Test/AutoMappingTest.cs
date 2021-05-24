//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Collections.Generic;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Services;
using Xunit;

namespace InspectionManager.ApplicationCore.Test
{
    public class AutoMappingTest
    {
        [Fact]
        public void MapToInspectionItemExportDtoCorrectly()
        {
            var item = new InspectionItemDto
            {
                InspectionItemId = "test",
                InspectionContent = "content",
                InputType = 3,
                Choices = new List<string>
                {
                    "foo", "var", "hoge"
                },
            };
            var mapper = CreateMapper();
            var actual = mapper.Map<InspectionItemExportDto>(item);
            Assert.Equal(0, actual.InspectionItemId);
            Assert.Equal("content", actual.InspectionContent);
            Assert.Equal(3, actual.InputMethod);
            Assert.Equal("foo", actual.Choices[0]);
            Assert.Equal("var", actual.Choices[1]);
            Assert.Equal("hoge", actual.Choices[2]);
            Assert.Empty(actual.Transitions);
        }

        [Fact]
        public void MapToEquipmentExportDtoCorrectly()
        {
            var expect = new EquipmentDto
            {
                EquipmentId = 10,
                EquipmentName = "equipment",
                InspectionItems = new List<InspectionItemDto>
                {
                    new InspectionItemDto
                    {
                        InspectionItemId = "test",
                        InspectionContent = "content",
                        InputType = 2,
                        Choices = new List<string>
                        {
                            "foo", "var",
                        },
                    }
                }
            };
            var mapper = CreateMapper();
            var actual = mapper.Map<EquipmentExportDto>(expect);
            Assert.Equal(expect.EquipmentId.ToString(), actual.EquipmentId);
            Assert.Equal(expect.EquipmentName, actual.EquipmentName);
            Assert.Equal(0, actual.InspectionItems[0].InspectionItemId);
            Assert.Equal("content", actual.InspectionItems[0].InspectionContent);
            Assert.Equal(2, actual.InspectionItems[0].InputMethod);
            Assert.Equal("foo", actual.InspectionItems[0].Choices[0]);
            Assert.Equal("var", actual.InspectionItems[0].Choices[1]);
        }

        [Fact]
        public void MapToInspectionSheetExportDtoCorrectly()
        {
            var item = new InspectionSheetDto
            {
                SheetId = 11,
                SheetName = "sheet name",
                InspectionType = "inspection type",
                InspectionGroup = "inspection group",
                Equipments = new List<EquipmentDto>(),
            };
            var mapper = CreateMapper();
            var actual = mapper.Map<InspectionSheetExportDto>(item);
            Assert.Equal("11", actual.SheetId);
            Assert.Equal("sheet name", actual.SheetName);
            Assert.Equal("inspection type", actual.InspectionType);
            Assert.Equal("inspection group", actual.InspectionGroup);
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
        public void MapToInspectionSheetDtoCorrectly()
        {
            var item = new InspectionSheet
            {
                SheetId = 1,
                SheetName = "sheet name",
                InspectionTypeId = 10,
                InspectionGroupId = 20,
            };
            var mapper = CreateMapper();
            var actual = mapper.Map<InspectionSheetDto>(item);
            Assert.Equal(1, actual.SheetId);
            Assert.Equal("sheet name", actual.SheetName);
            Assert.Equal(10, actual.InspectionTypeId);
            Assert.Equal(20, actual.InspectionGroupId);
        }

        public void MapToEquipmentDtoCorrectly()
        {
            var expect = new Equipment
            {
                EquipmentId = 1,
                EquipmentName = "equipment name",
            };
            var mapper = CreateMapper();
            var actual = mapper.Map<EquipmentDto>(expect);
            Assert.Equal(expect.EquipmentId, actual.EquipmentId);
            Assert.Equal(expect.EquipmentName, actual.EquipmentName);
        }

        private Mapper CreateMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapping>();
            });
            var mapper = new Mapper(config);
            return mapper;
        }
    }
}

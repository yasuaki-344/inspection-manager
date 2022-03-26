﻿using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;

namespace InspectionManager.ApplicationCore.Services;

public class AutoMapping : Profile
{
    /// <summary>
    /// Initializes a new instance of AutoMapping class.
    /// </summary>
    public AutoMapping()
    {
        CreateMap<ChoiceDto, string>()
            .ConvertUsing(src => src.Description);
        CreateMap<InspectionItemDto, InspectionItemExportDto>()
            .ForMember(dst => dst.InputMethod, opt => opt.MapFrom(src => src.InputTypeId - 1));

        CreateMap<EquipmentDto, EquipmentExportDto>();

        CreateMap<InspectionSheetDto, InspectionSheetExportDto>();

        CreateMap<InspectionGroup, InspectionGroupDto>();
        CreateMap<InspectionGroupDto, InspectionGroup>();
        CreateMap<InspectionType, InspectionTypeDto>();
        CreateMap<InspectionTypeDto, InspectionType>();
        CreateMap<Option, OptionDto>();
        CreateMap<OptionDto, Option>();
        CreateMap<ChoiceTemplate, ChoiceTemplateDto>();
        CreateMap<ChoiceTemplateDto, ChoiceTemplate>();

        CreateMap<InspectionSheet, InspectionSheetDto>();
        CreateMap<InspectionSheetDto, InspectionSheet>();

        CreateMap<Equipment, EquipmentDto>();
        CreateMap<EquipmentDto, Equipment>();
        CreateMap<InspectionItem, InspectionItemDto>();
        CreateMap<InspectionItemDto, InspectionItem>();
        CreateMap<Choice, ChoiceDto>();
        CreateMap<ChoiceDto, Choice>();
    }
}

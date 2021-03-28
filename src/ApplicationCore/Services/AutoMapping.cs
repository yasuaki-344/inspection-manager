//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;

namespace InspectionManager.ApplicationCore.Services
{
    public class AutoMapping : Profile
    {
        /// <summary>
        /// Initializes a new instance of AutoMapping class.
        /// </summary>
        public AutoMapping()
        {
            CreateMap<InspectionItemDto, InspectionItemExportDto>()
                .ForMember(dst => dst.InspectionItemId, opt => opt.Ignore())
                .ForMember(dst => dst.InputMethod, opt => opt.MapFrom(src => src.InputType));

            CreateMap<EquipmentDto, EquipmentExportDto>()
                .ForMember(dst => dst.EquipmentId, opt => opt.Ignore());

            CreateMap<InspectionSheetDto, InspectionSheetExportDto>();

            CreateMap<InspectionSheetDto, InspectionSheetSummaryDto>();
        }
    }
}

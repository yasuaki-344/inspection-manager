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
                .ForMember(dst => dst.InspectionItemId, src => src.Ignore())
                .ForMember(dst => dst.InputMethod, src => src.MapFrom(s => s.InputType));
        }
    }
}

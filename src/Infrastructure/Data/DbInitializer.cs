//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Linq;
using InspectionManager.ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace InspectionManager.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using (var context = new InspectionContext(
               serviceProvider.GetRequiredService<DbContextOptions<InspectionContext>>()))
            {
                {
                    context.Database.EnsureCreated();
                    if (context.InputTypes != null)
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
                }
            }
        }
    }
}

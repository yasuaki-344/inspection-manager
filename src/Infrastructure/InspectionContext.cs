//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using Microsoft.EntityFrameworkCore;

namespace InspectionManager.Infrastructure
{
    public class InspectionContext : DbContext
    {
        public InspectionContext(DbContextOptions<InspectionContext> options) : base(options)
        {

        }
    }
}

//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.IO;
using Xunit;

namespace InspectionManager.Infrastructure.Test
{
    public class CategoryFileRepositoryTest
    {
        [Fact]
        public void ThrowDirectoryNotFoundExceptionIfBaseDirectoryNotExist()
        {
            var target = new CategoryFileRepository();

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.GetInspectionTypes();
            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.GetInspectionTypes();
            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.GetChoiceTemplates();
            });
        }
    }
}

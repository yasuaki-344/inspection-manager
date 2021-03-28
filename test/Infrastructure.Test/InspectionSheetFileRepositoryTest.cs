//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.IO;
using InspectionManager.ApplicationCore.Dto;
using Xunit;

namespace InspectionManager.Infrastructure.Test
{
    public class InspectionSheetFileRepositoryTest
    {
        [Fact]
        public void ThrowDirectoryNotFoundExceptionIfBaseDirectoryNotExist()
        {
            var target = new InspectionSheetFileRepository();

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.InspectionSheetExists("");
            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.GetAllInspectionSheets();
            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.GetInspectionSheet("");
            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.UpdateInspectionSheet(new InspectionSheetDto());

            });

            Assert.ThrowsAny<DirectoryNotFoundException>(() =>
            {
                target.DeleteInspectionSheet("");
            });
        }
    }
}

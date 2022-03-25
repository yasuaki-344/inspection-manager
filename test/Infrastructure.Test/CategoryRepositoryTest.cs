using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Services;
using InspectionManager.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Infrastructure.Test;

public class CategoryRepositoryTest : IDisposable
{
    private readonly InspectionContext _context;
    private readonly IMapper _mapper;

    public CategoryRepositoryTest()
    {
        var options = new DbContextOptionsBuilder<InspectionContext>()
            .UseInMemoryDatabase(databaseName: "CategoryRepositoryTestDB")
            .Options;
        _context = new InspectionContext(options);

        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapping>());
        _mapper = new Mapper(config);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }

    [Fact]
    public void InspectionGroupExists_NonExistentId_ReturnsFalse()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.InspectionGroupExists(1);

        Assert.False(actual);
    }

    [Fact]
    public void InspectionGroupExists_ExistentId_ReturnsTrue()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.InspectionGroupExists(3);

        Assert.True(actual);
    }

    [Fact]
    public void GetInspectionGroup_NonExistentId_ThrowException()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        Assert.Throws<InvalidOperationException>(() =>
        {
            target.GetInspectionGroup(1);
        });
    }

    [Fact]
    public void GetInspectionGroup_ExistentId_ReturnsDto()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.GetInspectionGroup(3);

        Assert.Equal(3, actual.InspectionGroupId);
        Assert.Equal("group", actual.Description);
    }

    [Fact]
    public void InspectionTypeExists_NonExistentId_ReturnsFalse()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.InspectionGroupExists(1);

        Assert.False(actual);
    }

    [Fact]
    public void InspectionTypeExists_ExistentId_ReturnsTrue()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.InspectionTypeExists(3);

        Assert.True(actual);
    }

    [Fact]
    public void GetInspectionType_NonExistentId_ThrowException()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        Assert.Throws<InvalidOperationException>(() =>
        {
            target.GetInspectionType(1);
        });
    }

    [Fact]
    public void GetInspectionType_ExistentId_ReturnsDto()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.GetInspectionType(3);

        Assert.Equal(3, actual.InspectionTypeId);
        Assert.Equal("group", actual.Description);
    }

    [Fact]
    public void ChoiceTemplateExists_NonExistentId_ReturnsFalse()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.ChoiceTemplateExists(1);

        Assert.False(actual);
    }

    [Fact]
    public void ChoiceTemplateExists_ExistentId_ReturnsTrue()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.ChoiceTemplateExists(3);

        Assert.True(actual);
    }

    // /// <inheritdoc/>
    [Fact]
    public void GetChoiceTemplates_NonExistentId_ThrowException()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3,
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        Assert.Throws<InvalidOperationException>(() =>
        {
            target.GetChoiceTemplate(1);
        });
    }

    [Fact]
    public void GetChoiceTemplatese_ExistentId_ReturnsDto()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3,
            Choices = new List<Option>
            {
                new Option { Description = "choice1" },
                new Option { Description = "choice2" },
            }
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = target.GetChoiceTemplate(3);

        var choices = new List<string>{"choice1", "choice2"};
        Assert.Equal(3, actual.ChoiceTemplateId);
        Assert.Contains(actual.Choices, x => choices.Contains(x.Description));
    }

}

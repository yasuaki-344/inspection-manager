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
    public async Task CreateInspectionGroupAsync_NewDto_ReturnsRegisteredDto()
    {
        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionGroupDto
        {
            Description = "group"
        };
        var actualDto = await target.CreateInspectionGroupAsync(dto);

        Assert.NotEqual(0, actualDto.InspectionGroupId);
        Assert.Equal("group", actualDto.Description);

        var actualEntity = _context.InspectionGroups.First();
        Assert.NotEqual(0, actualEntity.InspectionGroupId);
        Assert.Equal("group", actualEntity.Description);
    }

    [Fact]
    public async Task UpdateInspectionGroupAsync_NonExistentId_ReturnsNull()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionGroupDto
        {
            InspectionGroupId = 2,
            Description = "group1"
        };
        var actualDto = await target.UpdateInspectionGroupAsync(dto);
        Assert.Null(actualDto);

        var actualEntity = _context.InspectionGroups.First();
        Assert.Equal(3, actualEntity.InspectionGroupId);
        Assert.Equal("group", actualEntity.Description);
    }

    [Fact]
    public async Task UpdateInspectionGroupAsync_UpdatedDto_ReturnsRegisteredDto()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionGroupDto
        {
            InspectionGroupId = 3,
            Description = "group1"
        };
        var actualDto = await target.UpdateInspectionGroupAsync(dto);

        Assert.Equal(3, actualDto.InspectionGroupId);
        Assert.Equal("group1", actualDto.Description);

        var actualEntity = _context.InspectionGroups.First();
        Assert.Equal(3, actualEntity.InspectionGroupId);
        Assert.Equal("group1", actualEntity.Description);
    }

    [Fact]
    public async Task DeleteInspectionGroupAsync_ExistentId_ReturnsNull()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = await target.DeleteInspectionGroupAsync(1);

        Assert.Null(actual);
    }

    [Fact]
    public async Task DeleteInspectionGroupAsync_ExistentId_ReturnsDto()
    {
        _context.InspectionGroups.Add(new InspectionGroup
        {
            InspectionGroupId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = await target.DeleteInspectionGroupAsync(3);

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
    public async Task CreateInspectionTypeAsync_NewDto_ReturnsRegisteredDto()
    {
        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionTypeDto
        {
            Description = "type"
        };
        var actualDto = await target.CreateInspectionTypeAsync(dto);

        Assert.NotEqual(0, actualDto.InspectionTypeId);
        Assert.Equal("type", actualDto.Description);

        var actualEntity = _context.InspectionTypes.First();
        Assert.NotEqual(0, actualEntity.InspectionTypeId);
        Assert.Equal("type", actualEntity.Description);
    }

    [Fact]
    public async Task UpdateInspectionTypeAsync_NonExistentId_ReturnsNull()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "type"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionTypeDto
        {
            InspectionTypeId = 2,
            Description = "type1"
        };
        var actualDto = await target.UpdateInspectionTypeAsync(dto);
        Assert.Null(actualDto);

        var actualEntity = _context.InspectionTypes.First();
        Assert.Equal(3, actualEntity.InspectionTypeId);
        Assert.Equal("type", actualEntity.Description);
    }

    [Fact]
    public async Task UpdateInspectionTypeAsync_UpdatedDto_ReturnsRegisteredDto()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "type"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new InspectionTypeDto
        {
            InspectionTypeId = 3,
            Description = "type1"
        };
        var actualDto = await target.UpdateInspectionTypeAsync(dto);

        Assert.Equal(3, actualDto.InspectionTypeId);
        Assert.Equal("type1", actualDto.Description);

        var actualEntity = _context.InspectionTypes.First();
        Assert.Equal(3, actualEntity.InspectionTypeId);
        Assert.Equal("type1", actualEntity.Description);
    }

    [Fact]
    public async Task DeleteInspectionTypeAsync_ExistentId_ReturnsNull()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = await target.DeleteInspectionTypeAsync(1);

        Assert.Null(actual);
    }

    [Fact]
    public async Task DeleteInspectionTypeAsync_ExistentId_ReturnsDto()
    {
        _context.InspectionTypes.Add(new InspectionType
        {
            InspectionTypeId = 3,
            Description = "group"
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var actual = await target.DeleteInspectionTypeAsync(3);

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

        var choices = new List<string> { "choice1", "choice2" };
        Assert.Equal(3, actual.ChoiceTemplateId);
        Assert.Contains(actual.Choices, x => choices.Contains(x.Description));
    }

    [Fact]
    public async Task CreateChoiceTemplateAsync_NewDto_ReturnsRegisteredDto()
    {
        var target = new CategoryRepository(_context, _mapper);
        var dto = new ChoiceTemplateDto
        {
            Choices = new List<OptionDto>
            {
                new OptionDto { Description = "choice1"},
                new OptionDto { Description = "choice2"}
            }
        };
        var actualDto = await target.CreateChoiceTemplateAsync(dto);

        var choices = new List<string> { "choice1", "choice2" };
        Assert.NotEqual(0, actualDto.ChoiceTemplateId);
        Assert.DoesNotContain(actualDto.Choices, x => x.OptionId == 0);
        Assert.Contains(actualDto.Choices, x => choices.Contains(x.Description));

        var actualEntity = _context.ChoiceTemplates.First();
        Assert.NotEqual(0, actualEntity.ChoiceTemplateId);
        Assert.DoesNotContain(actualEntity.Choices, x => x.OptionId == 0);
        Assert.Contains(actualEntity.Choices, x => choices.Contains(x.Description));
    }

    [Fact]
    public async Task UpdateChoiceTemplateAsync_NonExistentId_ReturnsNull()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3,
            Choices = new List<Option>
            {
                new Option { OptionId = 1, Description = "choice1" },
                new Option { OptionId = 2, Description = "choice2" }
            }
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new ChoiceTemplateDto
        {
            ChoiceTemplateId = 2,
        };
        var actualDto = await target.UpdateChoiceTemplateAsync(dto);
        Assert.Null(actualDto);

        var actualEntity = _context.ChoiceTemplates.First();
        Assert.Equal(3, actualEntity.ChoiceTemplateId);
    }

    [Fact]
    public async Task UpdateChoiceTemplateAsync_UpdatedDto_ReturnsRegisteredDto()
    {
        _context.ChoiceTemplates.Add(new ChoiceTemplate
        {
            ChoiceTemplateId = 3,
            Choices = new List<Option>
            {
                new Option { OptionId = 1, Description = "choice1" },
                new Option { OptionId = 2, Description = "choice2" }
            }
        });
        _context.SaveChanges();

        var target = new CategoryRepository(_context, _mapper);
        var dto = new ChoiceTemplateDto
        {
            ChoiceTemplateId = 3,
            // Choices = new List<OptionDto>
            // {
            //     new OptionDto { OptionId = 1, Description = "newChoice1" },
            //     new OptionDto { OptionId = 2, Description = "newChoice2" }
            // }
        };
        var actualDto = await target.UpdateChoiceTemplateAsync(dto);

        Assert.Equal(3, actualDto.ChoiceTemplateId);

        var actualEntity = _context.ChoiceTemplates.First();
        Assert.Equal(3, actualEntity.ChoiceTemplateId);
    }

    [Fact]
    public async Task DeleteChoiceTemplateAsync_ExistentId_ReturnsNull()
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
        var actual = await target.DeleteChoiceTemplateAsync(1);

        Assert.Null(actual);
    }

    [Fact]
    public async Task DeleteChoiceTemplateAsync_ExistentId_ReturnsDto()
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
        var actual = await target.DeleteChoiceTemplateAsync(3);

        var choices = new List<string> { "choice1", "choice2" };
        Assert.Equal(3, actual.ChoiceTemplateId);
        Assert.Contains(actual.Choices, x => choices.Contains(x.Description));
    }
}

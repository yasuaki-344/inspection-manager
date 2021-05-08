﻿// <auto-generated />
using InspectionManager.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InspectionManager.Infrastructure.Migrations
{
    [DbContext(typeof(InspectionContext))]
    partial class InspectionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Choice", b =>
                {
                    b.Property<int>("ChoiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("InspectionItemId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("ChoiceId");

                    b.HasIndex("InspectionItemId");

                    b.ToTable("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ChoiceTemplateId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ChoiceTemplates");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.Property<int>("EquipmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("EquipmentName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("InspectionSheetId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("EquipmentId");

                    b.HasIndex("InspectionSheetId");

                    b.ToTable("Equipments");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InputType", b =>
                {
                    b.Property<int>("InputTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InputTypeId");

                    b.ToTable("InputTypes");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionGroup", b =>
                {
                    b.Property<int>("InspectionGroupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InspectionGroupId");

                    b.ToTable("InspectionGroups");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.Property<int>("InspectionItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("EquipmentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("InputTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("InspectionContent")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("InspectionItemId");

                    b.HasIndex("EquipmentId");

                    b.HasIndex("InputTypeId");

                    b.ToTable("InspectionItems");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.Property<int>("InspectionSheetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("InspectionGroupId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("InspectionTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SheetName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InspectionSheetId");

                    b.HasIndex("InspectionGroupId");

                    b.HasIndex("InspectionTypeId");

                    b.ToTable("InspectionSheets");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionType", b =>
                {
                    b.Property<int>("InspectionTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InspectionTypeId");

                    b.ToTable("InspectionTypes");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Option", b =>
                {
                    b.Property<int>("OptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ChoiceTemplateId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ChoiceTemplateId1")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("OptionId");

                    b.HasIndex("ChoiceTemplateId1");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Choice", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionItem", "InspectionItem")
                        .WithMany("Choices")
                        .HasForeignKey("InspectionItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InspectionItem");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionSheet", "InspectionSheet")
                        .WithMany("Equipments")
                        .HasForeignKey("InspectionSheetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InspectionSheet");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.Equipment", "Equipment")
                        .WithMany("InspectionItems")
                        .HasForeignKey("EquipmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InspectionManager.ApplicationCore.Entities.InputType", "InputType")
                        .WithMany("InspectionItems")
                        .HasForeignKey("InputTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Equipment");

                    b.Navigation("InputType");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionGroup", "InspectionGroup")
                        .WithMany("InspectionSheets")
                        .HasForeignKey("InspectionGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionType", "InspectionType")
                        .WithMany("InspectionSheets")
                        .HasForeignKey("InspectionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InspectionGroup");

                    b.Navigation("InspectionType");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Option", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", "ChoiceTemplate")
                        .WithMany("Choices")
                        .HasForeignKey("ChoiceTemplateId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChoiceTemplate");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", b =>
                {
                    b.Navigation("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.Navigation("InspectionItems");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InputType", b =>
                {
                    b.Navigation("InspectionItems");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionGroup", b =>
                {
                    b.Navigation("InspectionSheets");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.Navigation("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.Navigation("Equipments");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionType", b =>
                {
                    b.Navigation("InspectionSheets");
                });
#pragma warning restore 612, 618
        }
    }
}

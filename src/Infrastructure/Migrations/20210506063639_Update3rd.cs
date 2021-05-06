using Microsoft.EntityFrameworkCore.Migrations;

namespace InspectionManager.Infrastructure.Migrations
{
    public partial class Update3rd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Choices_ChoiceTemplates_ChoiceTemplateId",
                table: "Choices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Choices",
                table: "Choices");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "InspectionTypes",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "InspectionGroups",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Choices",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "ChoiceTemplateId",
                table: "Choices",
                newName: "InspectionItemId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Choices",
                newName: "OrderIndex");

            migrationBuilder.RenameIndex(
                name: "IX_Choices_ChoiceTemplateId",
                table: "Choices",
                newName: "IX_Choices_InspectionItemId");

            migrationBuilder.AlterColumn<int>(
                name: "OrderIndex",
                table: "Choices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "ChoiceId",
                table: "Choices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Choices",
                table: "Choices",
                column: "ChoiceId");

            migrationBuilder.CreateTable(
                name: "InputTypes",
                columns: table => new
                {
                    InputTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InputTypes", x => x.InputTypeId);
                });

            migrationBuilder.CreateTable(
                name: "InspectionSheets",
                columns: table => new
                {
                    InspectionSheetId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SheetName = table.Column<string>(type: "TEXT", nullable: false),
                    InspectionTypeId = table.Column<int>(type: "INTEGER", nullable: true),
                    InspectionGroupId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionSheets", x => x.InspectionSheetId);
                    table.ForeignKey(
                        name: "FK_InspectionSheets_InspectionGroups_InspectionGroupId",
                        column: x => x.InspectionGroupId,
                        principalTable: "InspectionGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InspectionSheets_InspectionTypes_InspectionTypeId",
                        column: x => x.InspectionTypeId,
                        principalTable: "InspectionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    OptionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ChoiceTemplateId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.OptionId);
                    table.ForeignKey(
                        name: "FK_Options_ChoiceTemplates_ChoiceTemplateId",
                        column: x => x.ChoiceTemplateId,
                        principalTable: "ChoiceTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    EquipmentId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    EquipmentName = table.Column<string>(type: "TEXT", nullable: false),
                    InspectionSheetId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.EquipmentId);
                    table.ForeignKey(
                        name: "FK_Equipment_InspectionSheets_InspectionSheetId",
                        column: x => x.InspectionSheetId,
                        principalTable: "InspectionSheets",
                        principalColumn: "InspectionSheetId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InspectionItems",
                columns: table => new
                {
                    InspectionItemId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    InspectionContent = table.Column<string>(type: "TEXT", nullable: false),
                    InputTypeId = table.Column<int>(type: "INTEGER", nullable: true),
                    EquipmentId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionItems", x => x.InspectionItemId);
                    table.ForeignKey(
                        name: "FK_InspectionItems_Equipment_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "Equipment",
                        principalColumn: "EquipmentId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InspectionItems_InputTypes_InputTypeId",
                        column: x => x.InputTypeId,
                        principalTable: "InputTypes",
                        principalColumn: "InputTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_InspectionSheetId",
                table: "Equipment",
                column: "InspectionSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectionItems_EquipmentId",
                table: "InspectionItems",
                column: "EquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectionItems_InputTypeId",
                table: "InspectionItems",
                column: "InputTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectionSheets_InspectionGroupId",
                table: "InspectionSheets",
                column: "InspectionGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectionSheets_InspectionTypeId",
                table: "InspectionSheets",
                column: "InspectionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Options_ChoiceTemplateId",
                table: "Options",
                column: "ChoiceTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Choices_InspectionItems_InspectionItemId",
                table: "Choices",
                column: "InspectionItemId",
                principalTable: "InspectionItems",
                principalColumn: "InspectionItemId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Choices_InspectionItems_InspectionItemId",
                table: "Choices");

            migrationBuilder.DropTable(
                name: "InspectionItems");

            migrationBuilder.DropTable(
                name: "Options");

            migrationBuilder.DropTable(
                name: "Equipment");

            migrationBuilder.DropTable(
                name: "InputTypes");

            migrationBuilder.DropTable(
                name: "InspectionSheets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Choices",
                table: "Choices");

            migrationBuilder.DropColumn(
                name: "ChoiceId",
                table: "Choices");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "InspectionTypes",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "InspectionGroups",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "OrderIndex",
                table: "Choices",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "InspectionItemId",
                table: "Choices",
                newName: "ChoiceTemplateId");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Choices",
                newName: "Text");

            migrationBuilder.RenameIndex(
                name: "IX_Choices_InspectionItemId",
                table: "Choices",
                newName: "IX_Choices_ChoiceTemplateId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Choices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Choices",
                table: "Choices",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Choices_ChoiceTemplates_ChoiceTemplateId",
                table: "Choices",
                column: "ChoiceTemplateId",
                principalTable: "ChoiceTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

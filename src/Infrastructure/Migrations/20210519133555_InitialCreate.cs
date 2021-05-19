using Microsoft.EntityFrameworkCore.Migrations;

namespace InspectionManager.Infrastructure.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChoiceTemplates",
                columns: table => new
                {
                    ChoiceTemplateId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoiceTemplates", x => x.ChoiceTemplateId);
                });

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
                name: "InspectionGroups",
                columns: table => new
                {
                    InspectionGroupId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionGroups", x => x.InspectionGroupId);
                });

            migrationBuilder.CreateTable(
                name: "InspectionTypes",
                columns: table => new
                {
                    InspectionTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionTypes", x => x.InspectionTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    OptionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ChoiceTemplateId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.OptionId);
                    table.ForeignKey(
                        name: "FK_Options_ChoiceTemplates_ChoiceTemplateId",
                        column: x => x.ChoiceTemplateId,
                        principalTable: "ChoiceTemplates",
                        principalColumn: "ChoiceTemplateId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspectionSheets",
                columns: table => new
                {
                    InspectionSheetId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SheetName = table.Column<string>(type: "TEXT", nullable: false),
                    InspectionTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    InspectionGroupId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionSheets", x => x.InspectionSheetId);
                    table.ForeignKey(
                        name: "FK_InspectionSheets_InspectionGroups_InspectionGroupId",
                        column: x => x.InspectionGroupId,
                        principalTable: "InspectionGroups",
                        principalColumn: "InspectionGroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspectionSheets_InspectionTypes_InspectionTypeId",
                        column: x => x.InspectionTypeId,
                        principalTable: "InspectionTypes",
                        principalColumn: "InspectionTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Equipments",
                columns: table => new
                {
                    EquipmentId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    EquipmentName = table.Column<string>(type: "TEXT", nullable: false),
                    InspectionSheetId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipments", x => x.EquipmentId);
                    table.ForeignKey(
                        name: "FK_Equipments_InspectionSheets_InspectionSheetId",
                        column: x => x.InspectionSheetId,
                        principalTable: "InspectionSheets",
                        principalColumn: "InspectionSheetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspectionItems",
                columns: table => new
                {
                    InspectionItemId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    InspectionContent = table.Column<string>(type: "TEXT", nullable: false),
                    InputTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    EquipmentId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionItems", x => x.InspectionItemId);
                    table.ForeignKey(
                        name: "FK_InspectionItems_Equipments_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "Equipments",
                        principalColumn: "EquipmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspectionItems_InputTypes_InputTypeId",
                        column: x => x.InputTypeId,
                        principalTable: "InputTypes",
                        principalColumn: "InputTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Choices",
                columns: table => new
                {
                    ChoiceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    InspectionItemId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Choices", x => x.ChoiceId);
                    table.ForeignKey(
                        name: "FK_Choices_InspectionItems_InspectionItemId",
                        column: x => x.InspectionItemId,
                        principalTable: "InspectionItems",
                        principalColumn: "InspectionItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Choices_InspectionItemId",
                table: "Choices",
                column: "InspectionItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_InspectionSheetId",
                table: "Equipments",
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Choices");

            migrationBuilder.DropTable(
                name: "Options");

            migrationBuilder.DropTable(
                name: "InspectionItems");

            migrationBuilder.DropTable(
                name: "ChoiceTemplates");

            migrationBuilder.DropTable(
                name: "Equipments");

            migrationBuilder.DropTable(
                name: "InputTypes");

            migrationBuilder.DropTable(
                name: "InspectionSheets");

            migrationBuilder.DropTable(
                name: "InspectionGroups");

            migrationBuilder.DropTable(
                name: "InspectionTypes");
        }
    }
}

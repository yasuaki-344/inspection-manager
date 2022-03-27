using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InspectionManager.Infrastructure.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "choice_templates",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_choice_templates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "input_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_input_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "inspection_groups",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inspection_groups", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "inspection_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inspection_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "options",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    order_index = table.Column<int>(type: "INTEGER", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: false),
                    choice_template_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_options", x => x.id);
                    table.ForeignKey(
                        name: "FK_options_choice_templates_choice_template_id",
                        column: x => x.choice_template_id,
                        principalTable: "choice_templates",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inspection_sheets",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    sheet_name = table.Column<string>(type: "TEXT", nullable: false),
                    inspection_type_id = table.Column<int>(type: "INTEGER", nullable: false),
                    inspection_group_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inspection_sheets", x => x.id);
                    table.ForeignKey(
                        name: "FK_inspection_sheets_inspection_groups_inspection_group_id",
                        column: x => x.inspection_group_id,
                        principalTable: "inspection_groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inspection_sheets_inspection_types_inspection_type_id",
                        column: x => x.inspection_type_id,
                        principalTable: "inspection_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "equipments",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    order_index = table.Column<int>(type: "INTEGER", nullable: false),
                    equipment_name = table.Column<string>(type: "TEXT", nullable: false),
                    inspection_sheet_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_equipments", x => x.id);
                    table.ForeignKey(
                        name: "FK_equipments_inspection_sheets_inspection_sheet_id",
                        column: x => x.inspection_sheet_id,
                        principalTable: "inspection_sheets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inspection_items",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    order_index = table.Column<int>(type: "INTEGER", nullable: false),
                    inspection_content = table.Column<string>(type: "TEXT", nullable: false),
                    input_type_id = table.Column<int>(type: "INTEGER", nullable: false),
                    equipment_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inspection_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_inspection_items_equipments_equipment_id",
                        column: x => x.equipment_id,
                        principalTable: "equipments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inspection_items_input_types_input_type_id",
                        column: x => x.input_type_id,
                        principalTable: "input_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "choices",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    order_index = table.Column<int>(type: "INTEGER", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: false),
                    inspection_item_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_choices", x => x.id);
                    table.ForeignKey(
                        name: "FK_choices_inspection_items_inspection_item_id",
                        column: x => x.inspection_item_id,
                        principalTable: "inspection_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_choices_inspection_item_id",
                table: "choices",
                column: "inspection_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_equipments_inspection_sheet_id",
                table: "equipments",
                column: "inspection_sheet_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_items_equipment_id",
                table: "inspection_items",
                column: "equipment_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_items_input_type_id",
                table: "inspection_items",
                column: "input_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_sheets_inspection_group_id",
                table: "inspection_sheets",
                column: "inspection_group_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_sheets_inspection_type_id",
                table: "inspection_sheets",
                column: "inspection_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_options_choice_template_id",
                table: "options",
                column: "choice_template_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "choices");

            migrationBuilder.DropTable(
                name: "options");

            migrationBuilder.DropTable(
                name: "inspection_items");

            migrationBuilder.DropTable(
                name: "choice_templates");

            migrationBuilder.DropTable(
                name: "equipments");

            migrationBuilder.DropTable(
                name: "input_types");

            migrationBuilder.DropTable(
                name: "inspection_sheets");

            migrationBuilder.DropTable(
                name: "inspection_groups");

            migrationBuilder.DropTable(
                name: "inspection_types");
        }
    }
}

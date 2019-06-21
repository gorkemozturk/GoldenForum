using Microsoft.EntityFrameworkCore.Migrations;

namespace GoldenForum.Service.Migrations
{
    public partial class ChangePostTypeAttrAsVariety : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostType",
                table: "Posts",
                newName: "Variety");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Variety",
                table: "Posts",
                newName: "PostType");
        }
    }
}

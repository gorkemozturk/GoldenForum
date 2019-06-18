using Microsoft.EntityFrameworkCore.Migrations;

namespace GoldenForum.Service.Migrations
{
    public partial class AddPostTypeEnumToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAttached",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "PostType",
                table: "Posts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostType",
                table: "Posts");

            migrationBuilder.AddColumn<bool>(
                name: "IsAttached",
                table: "Posts",
                nullable: false,
                defaultValue: false);
        }
    }
}

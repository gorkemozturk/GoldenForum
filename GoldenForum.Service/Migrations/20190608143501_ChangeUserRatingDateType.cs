using Microsoft.EntityFrameworkCore.Migrations;

namespace GoldenForum.Service.Migrations
{
    public partial class ChangeUserRatingDateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(double),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}

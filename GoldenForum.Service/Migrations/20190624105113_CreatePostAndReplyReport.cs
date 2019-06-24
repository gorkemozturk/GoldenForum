using Microsoft.EntityFrameworkCore.Migrations;

namespace GoldenForum.Service.Migrations
{
    public partial class CreatePostAndReplyReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostReports_AspNetUsers_UserId",
                table: "PostReports");

            migrationBuilder.DropForeignKey(
                name: "FK_ReplyReports_AspNetUsers_UserId",
                table: "ReplyReports");

            migrationBuilder.DropIndex(
                name: "IX_ReplyReports_UserId",
                table: "ReplyReports");

            migrationBuilder.DropIndex(
                name: "IX_PostReports_UserId",
                table: "PostReports");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ReplyReports");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PostReports");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "ReplyReports",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "PostReports",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReplyReports_UserId",
                table: "ReplyReports",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReports_UserId",
                table: "PostReports",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostReports_AspNetUsers_UserId",
                table: "PostReports",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReplyReports_AspNetUsers_UserId",
                table: "ReplyReports",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

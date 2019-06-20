﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace GoldenForum.Service.Migrations
{
    public partial class AddPriorityAttrToCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Categories",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Categories");
        }
    }
}

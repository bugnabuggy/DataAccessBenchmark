using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace benchmark.Migrations
{
    public partial class changedtoHistoryTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComplexQueryTimeEntityFramework",
                table: "HistoryTests");

            migrationBuilder.DropColumn(
                name: "ComplexQueryTimeLink",
                table: "HistoryTests");

            migrationBuilder.DropColumn(
                name: "TimeAddEntityFramework",
                table: "HistoryTests");

            migrationBuilder.RenameColumn(
                name: "TimeClearSql",
                table: "HistoryTests",
                newName: "TypeOperation");

            migrationBuilder.RenameColumn(
                name: "TimeClearEntityFramework",
                table: "HistoryTests",
                newName: "ExecutionTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TypeOperation",
                table: "HistoryTests",
                newName: "TimeClearSql");

            migrationBuilder.RenameColumn(
                name: "ExecutionTime",
                table: "HistoryTests",
                newName: "TimeClearEntityFramework");

            migrationBuilder.AddColumn<string>(
                name: "ComplexQueryTimeEntityFramework",
                table: "HistoryTests",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ComplexQueryTimeLink",
                table: "HistoryTests",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimeAddEntityFramework",
                table: "HistoryTests",
                nullable: true);
        }
    }
}

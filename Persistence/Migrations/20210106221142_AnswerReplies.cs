using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AnswerReplies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnswerReplies",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    Likes = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    AnswerId = table.Column<string>(nullable: true),
                    AuthorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerReplies_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AnswerReplies_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswerReplies_AnswerId",
                table: "AnswerReplies",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerReplies_AuthorId",
                table: "AnswerReplies",
                column: "AuthorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerReplies");
        }
    }
}

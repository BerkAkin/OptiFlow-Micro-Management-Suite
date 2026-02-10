using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyModule.Migrations
{
    /// <inheritdoc />
    public partial class surveySatisfaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers");

            migrationBuilder.CreateTable(
                name: "SatisfactionRates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyId = table.Column<int>(type: "int", nullable: false),
                    Satisfaction = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SatisfactionRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SatisfactionRates_Surveys_SurveyId",
                        column: x => x.SurveyId,
                        principalTable: "Surveys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserId_SurveyId_QuestionId",
                table: "UserAnswers",
                columns: new[] { "UserId", "SurveyId", "QuestionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SatisfactionRates_SurveyId",
                table: "SatisfactionRates",
                column: "SurveyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SatisfactionRates");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_UserId_SurveyId_QuestionId",
                table: "UserAnswers");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers",
                column: "UserId");
        }
    }
}

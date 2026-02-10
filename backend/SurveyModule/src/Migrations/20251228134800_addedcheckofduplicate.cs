using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyModule.Migrations
{
    /// <inheritdoc />
    public partial class addedcheckofduplicate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SatisfactionRates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SatisfactionRates_UserId_SurveyId",
                table: "SatisfactionRates",
                columns: new[] { "UserId", "SurveyId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SatisfactionRates_UserId_SurveyId",
                table: "SatisfactionRates");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SatisfactionRates");
        }
    }
}

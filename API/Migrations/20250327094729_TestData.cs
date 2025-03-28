using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Telefon açıklaması", "1.jpg", true, "IPhone 15", 100m, 100 },
                    { 2, "Telefon açıklaması", "2.jpg", true, "IPhone 15", 200m, 200 },
                    { 3, "Telefon açıklaması", "3.jpg", true, "IPhone 15", 300m, 300 },
                    { 4, "Telefon açıklaması", "4.jpg", false, "IPhone 15", 400m, 400 },
                    { 5, "Telefon açıklaması", "5.jpg", true, "IPhone 15", 500m, 500 },
                    { 6, "Telefon açıklaması", "6.jpg", true, "IPhone 15", 600m, 600 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}

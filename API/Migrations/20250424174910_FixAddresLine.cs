using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class FixAddresLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryFee",
                table: "Orders",
                newName: "DeliveryFree");

            migrationBuilder.RenameColumn(
                name: "AddressLine",
                table: "Orders",
                newName: "ConversationId");

            migrationBuilder.AddColumn<string>(
                name: "AddresLine",
                table: "Orders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BasketId",
                table: "Orders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductName",
                table: "OrderItem",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductImage",
                table: "OrderItem",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddresLine",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "DeliveryFree",
                table: "Orders",
                newName: "DeliveryFee");

            migrationBuilder.RenameColumn(
                name: "ConversationId",
                table: "Orders",
                newName: "AddressLine");

            migrationBuilder.AlterColumn<string>(
                name: "ProductName",
                table: "OrderItem",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "ProductImage",
                table: "OrderItem",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}

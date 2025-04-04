import { TableCell, TableRow } from "@mui/material";
import { useCartContext } from "../../context/useCartContext";

export default function CartSummary() {
    const { cart } = useCartContext();
    const subTotal = cart?.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const tax = subTotal * 0.2; // Assuming a tax rate of 20%
  return (
    <>
      <TableRow>
        <TableCell align="right" colSpan={5}>
          Sub-Total
        </TableCell>
        <TableCell align="right">{subTotal}$</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="right" colSpan={5}>
          Taxes(20%)
        </TableCell>
        <TableCell align="right">{tax}$</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="right" colSpan={5}>
          Total
        </TableCell>
        <TableCell align="right">{subTotal + tax}$</TableCell>
      </TableRow>
    </>
  );
}

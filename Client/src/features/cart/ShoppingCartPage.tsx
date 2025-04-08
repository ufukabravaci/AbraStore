import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cart?.cartItems.length === 0)
    return <Alert severity="warning">There are no items in your cart.</Alert>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5043/images/${item.imageUrl}`}
                  alt={item.name}
                  style={{ height: 60 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={status === "pendingAddItem" + item.productId}
                  onClick={() => {
                    dispatch(addItemToCart({ productId: item.productId }));
                    toast.success("Item added to cart");
                  }}
                >
                  <AddCircleOutline />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                  loading={status === "pendingDeleteItem" + item.productId + "single"}
                  onClick={() => {
                    dispatch(deleteItemFromCart({ productId: item.productId, quantity:1, key: "single" }));
                    toast.error("Item removed from cart");
                  }}
                >
                  <RemoveCircleOutline />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{item.price * item.quantity}$</TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={status === "pendingAddItem" + item.productId + "all"}
                  onClick={() => {
                    dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity, key: "all" }));
                    toast.error("Item removed from cart");
                  }}
                >
                  <Delete color="error" />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
          <CartSummary />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

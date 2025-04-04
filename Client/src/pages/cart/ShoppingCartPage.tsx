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
import { useCartContext } from "../../context/useCartContext";
import { useState } from "react";
import requests from "../../api/requests";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";

export default function ShoppingCartPage() {
  const { cart, setCart } = useCartContext();
  const [status, setStatus] = useState({loading:false, id:""});

  const handleAddItem = (productId: number , id:string) => {
    setStatus({loading:true, id: id});
    requests.Cart.add(productId)
      .then((cart) => {
        setCart(cart);
        toast.success("Product added to your cart!");
      })
      .catch((e) => console.log(e))
      .finally(() => setStatus({loading: false, id: ""}));
  };

  function handleDeleteItem(productId: number, id:string, quantity = 1) {
    setStatus({loading:true, id:id});
    requests.Cart.deleteItem(productId, quantity)
      .then((cart) => {
        setCart(cart)
        toast.error("Product deleted from your cart");
      })
      .catch((error) => console.log(error))
      .finally(() => setStatus({loading:false, id: ""}));
  }

  if (cart?.cartItems.length === 0) return <Alert severity="warning">There are no items in your cart.</Alert>

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
                  loading={status.loading && status.id === "add" + item.productId}
                  onClick={() => handleAddItem(item.productId, "add" + item.productId)}
                >
                  <AddCircleOutline />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                  loading={status.loading && status.id === "del" + item.productId}
                  onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}
                >
                  <RemoveCircleOutline />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{item.price * item.quantity}$</TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={status.loading && status.id === "del_all" + item.productId}
                  onClick={() => handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity)}
                >
                  <Delete color="error" />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
          <CartSummary/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

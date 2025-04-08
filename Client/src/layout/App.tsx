import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requests from "../api/requests";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCart } from "../features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.Cart.get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <CircularProgress />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;

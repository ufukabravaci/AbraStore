import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requests from "../api/requests";
import { useCartContext } from "../context/useCartContext";

function App() {
  const { setCart} = useCartContext()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  requests.Cart.get()
  .then(cart => setCart(cart))
.catch(e => console.log(e))
  .finally(() => setLoading(false))
},[setCart]);
if(loading) return <CircularProgress/>
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

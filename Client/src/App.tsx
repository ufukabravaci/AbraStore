import { useEffect, useState } from "react";
import { IProduct } from "./model/IProduct";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Container, CssBaseline } from "@mui/material";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch("http://localhost:5043/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
}

export default App;

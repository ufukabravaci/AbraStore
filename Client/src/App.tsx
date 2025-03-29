import { useEffect, useState } from "react";
import { IProduct } from "./model/IProduct";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch("http://localhost:5043/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  function addProduct() { 
    setProducts([...products, { id: Date.now(), name: "New Product", price: 0, isActive: true }]);
  }

  return (
    <>
      <Header products={products} />
      <ProductList products={products} addProduct={addProduct}/>
    </>
  );
}

export default App;

import { useEffect } from "react";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProducts,selectAllProducts } from "./catalogSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const {status, isLoaded} = useAppSelector((state) => state.catalog);
 
  useEffect(() => {
    if(!isLoaded) dispatch(fetchProducts());  
  }, [isLoaded]);
  if (status === "pendingFetchProducts") return <CircularProgress />;
  return <ProductList products={products} />;
}

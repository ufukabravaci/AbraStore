import {
  Grid,
  Typography,
  CircularProgress,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useCartContext } from "../../context/useCartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { cart, setCart } = useCartContext();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const item = cart?.cartItems.find((item) => item.productId === product?.id);
  useEffect(() => {
    if (!id) return;
    requests.Catalog.details(parseInt(id))
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddItem(productId: number) {
    setIsAdded(true);
    requests.Cart.add(productId)
      .then((cart) => {
        setCart(cart);
        toast.success("Product added to cart");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAdded(false));
  }

  if (loading) return <CircularProgress />;
  if (!product) return <Typography variant="h5">Product not found</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4, xl: 3 }}>
        <img
          src={`http://localhost:5043/images/${product.imageUrl}`}
          alt={product.name}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 7, lg: 8, xl: 9 }}>
        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" sx={{ mt: 3 }} spacing={2} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={isAdded}
            onClick={() => handleAddItem(product.id)}
            disabled={
              !!item &&
              product?.stock !== undefined &&
              item.quantity >= product.stock
            }
          >
            {!!item && !!product && item.quantity >= (product?.stock ?? 0) //check if item quantity is greater than or equal to stock
              ? "Out of stock"
              : "Add to Cart"} 
          </LoadingButton>
          {item?.quantity && item.quantity > 0 && (
            <Typography variant="body2">
              You have {item.quantity} of this product in your cart.
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

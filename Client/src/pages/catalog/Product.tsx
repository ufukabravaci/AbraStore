import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { useCartContext } from "../../context/useCartContext";
interface Props {
  product: IProduct;
}
export default function Product({ product }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const {setCart} = useCartContext();
  const handleAddItem = (productId: number) => {
    setLoading(true);
    requests.Cart.add(productId)
    .then(cart => setCart(cart))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5043/images/${product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text-secondary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {product.price.toFixed(2)}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddShoppingCart />}
          color="success"
          onClick={() => handleAddItem(product.id)}
          loading={isLoading}
          loadingPosition="start"
        >
          ADD TO CART
        </Button>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          variant="outlined"
          size="small"
          startIcon={<SearchIcon />}
          color="primary"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

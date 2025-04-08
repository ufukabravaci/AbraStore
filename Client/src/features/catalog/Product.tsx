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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItemToCart } from "../cart/cartSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from "react-toastify";
interface Props {
  product: IProduct;
}
export default function Product({ product }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
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
          onClick={() => {
            dispatch(addItemToCart({ productId: product.id }));
            toast.success("Item added to cart");
          }}
          loading={status === "pending" + product.id}
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

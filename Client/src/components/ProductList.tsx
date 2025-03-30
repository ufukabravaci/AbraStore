import Grid from "@mui/material/Grid";
import { IProduct } from "../model/IProduct";
import Product from "./Product";

interface Props {
  products: IProduct[];
}

export default function ProductList({ products }: Props) {
  return (
    <div>
      <Grid container spacing={2}>
        {products.map((p: IProduct) => (
          <Grid size={{xs: 12, md:4, lg:3}} key={p.id} >
            <Product  product={p} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

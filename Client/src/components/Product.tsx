import { IProduct } from "../model/IProduct";

interface Props {
  product: IProduct;
}
export default function Product({product}: Props) {
  return (
    <>
      {product.isActive ? (
        <div>
          <h3>{product.name}</h3>
          {/* <p>{props.product.description && props.product.description}</p> */}
          <p>{product.price}</p>
        </div>
      ) : (
        <h3>Product is not active</h3>
      )}
    </>
  );
}

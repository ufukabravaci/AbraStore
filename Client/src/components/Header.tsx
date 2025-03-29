import { IProduct } from "../model/IProduct";

interface Props {
    products: IProduct[];
}
function Header(props: Props) {
  return <h1>Header[{props.products.length}]</h1>;
}
export default Header;

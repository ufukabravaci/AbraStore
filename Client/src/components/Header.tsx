import { AppBar, Container, Toolbar, Typography } from "@mui/material";
// import { IProduct } from "../model/IProduct";

// // interface Props {
// //     products: IProduct[];
// // }
function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Container>
          <Typography variant="h6">AbraStore</Typography>
        </Container>
        {/* <Typography variant="h6">AbraStore</Typography> */}
      </Toolbar>
    </AppBar>
  );
}
export default Header;

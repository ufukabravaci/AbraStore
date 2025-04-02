import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Error", to: "/error" },
];
const navStyles = {
  color: "inherit",
  mr: -1,
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "warning.main",
    fontWeight: "bold",
  },
};
function Header() {
  const {cart} = useCartContext();
  const totalItemCount = cart?.cartItems.reduce((total,item) => total += item.quantity,0)
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent:"space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{mr:4}}>AbraStore</Typography>
          <List sx={{ display: "flex" }}>
            {links.map((link) => (
              <ListItem
                component={NavLink}
                to={link.to}
                sx={navStyles}
                key={link.title}
              >
                {link.title}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component= {Link} to="/cart" size="large" edge="start" color="inherit">
            <Badge badgeContent={totalItemCount} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Header;

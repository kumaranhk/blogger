import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { colors } from "../../constants/constants";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const page = useLocation().pathname;
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  let menuLinks = [
    { label: "Blogs", path: "/" },
    { label: "My Blogs", path: "/my-blogs" },
  ];
  if (["/login", "/signup"].includes(page)) {
    menuLinks = [];
  }

  const handleOpenUserMenu = (event) => setUserMenuAnchor(event.currentTarget);
  const handleCloseUserMenu = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(239 246 255)",
        color: "black",
        boxShadow: 1,
        height: 60,
        padding: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src="https://img.icons8.com/color/480/blogger.png"
            alt="IMDb Logo"
            style={{ width: 50, height: 50 }}
          />
        </Link>

        {/* Menu Links (Desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuLinks.map(({ label, path }) => (
            <Button
              key={path}
              component={NavLink}
              to={path}
              variant="text"
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: 15,
                borderBottom: "2px solid transparent",
                "&.active": {
                  borderBottom: `2px solid ${colors.primary}`,
                  fontWeight: "bold",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                sx={{ backgroundColor: colors.primary }}
                onClick={() => navigate("/add-blog")}
              >
                Add blog
              </Button>
              {/* Desktop Avatar */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt={user?.name || "User"}
                      src={user?.avatar || ""}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            page !== "/login" && (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  backgroundColor: colors.primary,
                  fontWeight: "bold",
                  textTransform: "none",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                Log in
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

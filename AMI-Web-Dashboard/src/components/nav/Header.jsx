import {
  AppBar,
  Toolbar,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";
import { useNavigate } from "react-router-dom";
import {COLORS} from '../../styles/colors'

const drawerWidth = 250;

const Header = ({ isClosing, setMobileOpen, mobileOpen }) => {
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <AppBar
      style={{ backgroundColor: `${COLORS.darkCard}` }}
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ justifyContent: { xs: "flex-end" } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <NotificationsActiveSharpIcon
          onClick={() => {
            navigate("/notification")
          }}
          sx={{
            justifyContent: "flex-end",
            cursor: "pointer",
            "&:hover": {
              color: "#f5b869",
              transition: "all 1s ease",
            },
          }}
        />

      </Toolbar>
    </AppBar>
  );
};

export default Header;

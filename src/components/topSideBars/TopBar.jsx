
import React from "react";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import goalIcon from  "../../assets/goalIcon.png";
import { Logout } from "@mui/icons-material";


export default function TopBar({ handleDrawerToggle }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const { logout} = useAuth();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #240046 0%, #3c096c 40%, #10002b 100%)"
            : "linear-gradient(90deg, #ede7f6 0%, #d1c4e9 40%, #b39ddb 100%)",
        color: theme.palette.mode === "dark" ? "#fdfcff" : "#1b1033",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.06)"
        }`,
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>


  <Box display="flex" alignItems="center" gap={1}>
    {isMobile && (
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
    )}

    <img
      src={goalIcon}
      alt="logo"
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        objectFit: "cover"
      }}
    />
  </Box>

 
  <Box sx={{ flexGrow: 1 }} />


  <Box display="flex" gap={1.5}>
    <IconButton color="inherit">
      <NotificationsIcon />
    </IconButton>

    <IconButton color="inherit" onClick={() => navigate("/profile")}>
      <PersonIcon />
    </IconButton>

    <button onClick={logout}>
      <Typography>Logout</Typography>
    </button>
  </Box>

</Toolbar>
    </AppBar>
  );
};

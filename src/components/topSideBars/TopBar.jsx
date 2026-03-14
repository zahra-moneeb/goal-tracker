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


export default function TopBar({ handleDrawerToggle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
  
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 600,
            letterSpacing: 0.8,
          }}
        >
          Goal Tracker
        </Typography>

       
        <Box display="flex" gap={1.5}>
          <IconButton
            color="inherit"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(15, 23, 42, 0.32)"
                  : "rgba(255,255,255,0.8)",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(15, 23, 42, 0.6)"
                    : "#ffffff",
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <IconButton
            color="inherit"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(15, 23, 42, 0.32)"
                  : "rgba(255,255,255,0.8)",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(15, 23, 42, 0.6)"
                    : "#ffffff",
              },
            }}
          >
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

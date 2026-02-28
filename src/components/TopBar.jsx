import React from "react";
import { AppBar, ButtonBase, Toolbar, Typography, useMediaQuery } from "@mui/material";
import {Box, IconButton, useTheme} from "@mui/material";
import { ColorModeContext,tokens } from "../theme";
// import { useContext } from "react";
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
 
      <AppBar position="fixed" color={colors.blueAccent[500]} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
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
        
  
        <Typography variant="h6" noWrap>
          Goal Tracker
        </Typography>

       
        <Box display="flex" gap={2}>

          <IconButton>
            <NotificationsIcon/>
          </IconButton>

          <IconButton>
            <PersonIcon/>
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

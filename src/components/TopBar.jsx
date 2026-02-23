import React from "react";
import { AppBar, ButtonBase, Toolbar, Typography } from "@mui/material";
import {Box, IconButton, useTheme} from "@mui/material";
import { ColorModeContext,tokens } from "../theme";
import { useContext } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';

export default function TopBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
 
      <AppBar position="fixed" color={colors.blueAccent[500]} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* سمت چپ: عنوان */}
        <Typography variant="h6" noWrap>
          Goal Tracker
        </Typography>

        {/* سمت راست: آیکن‌ها */}
        <Box display="flex" gap={2}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>

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

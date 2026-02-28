import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import TopBar from "../components/TopBar";

const drawerWidth = 240;

export default function MainLayout() {
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrowerToggle = ()=> {
    setMobileOpen(!mobileOpen);
  }
  return (
    <Box sx={{ display: "flex" }}>
      
        <TopBar handleDrawerToggle={handleDrowerToggle} />
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrowerToggle}
        />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: `calc(100% - ${drawerWidth}px)`,
          mt: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
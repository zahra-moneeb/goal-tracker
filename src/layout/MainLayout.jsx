import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import TopBar from "../components/TopBar";

const drawerWidth = 240;

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      
      <TopBar/>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbare() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Goal Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
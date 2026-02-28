import { Drawer,List, ListItem, Toolbar, ListItemText,FormControl,Select,MenuItem, InputLabel, Typography } from "@mui/material"
import { useTheme, IconButton, ListItemButton ,ListItemIcon } from "@mui/material";
import { useContext } from "react";
import { tokens, ColorModeContext } from "../theme";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';  



export default function SideBar({ mobileOpen, handleDrawerToggle }) {
   const { t, i18n } = useTranslation();
  const theme = useTheme();
  const drawerWidth = 240 ;
   const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

     return (

    <Drawer
        anchor={theme.direction === "rtl" ? "right" : "left"}
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
          ModalProps={{
    keepMounted: true, // بهتر است برای performance
  }}

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
          },
        }}
    >
      <Toolbar />

      <List>
        {[
            { text: "dashboard", path: "/dashboard", icon: <DashboardIcon /> },
            { text: "goals", path: "/goals", icon: <FlagIcon /> },
            { text: "categories", path: "/categories", icon: <CategoryIcon /> },
            { text: "settings", path: "/settings", icon: <SettingsIcon /> },
        ].map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => { if (isMobile) handleDrawerToggle(); }}
              sx={{
                "&.active": {
                  fontWeight: "bold",
                  color: colors.blueAccent[500],
                },
              }}
            >
              <ListItemIcon sx={{color: colors.blueAccent[200]}}>{item.icon}</ListItemIcon> 
              <ListItemText primary={t(item.text)} />
            </ListItemButton>
          </ListItem>
          
        ))}
      </List>


      <FormControl fullWidth sx={{ p: 1, mt: 5 }}>
            <InputLabel id="language-select-label">
              {t("language")}
            </InputLabel>

            <Select
              labelId="language-select-label"
              value={i18n.language}
              label={t("language")}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fa">فارسی</MenuItem>
            </Select>
      </FormControl>

      <Box sx={{ p: 2, mt: 2 }}>
        
          <IconButton onClick={colorMode.toggleColorMode}>
            <Stack direction="row" alignItems="center" gap={1}>
                {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}

                <Typography variant="body2" >
                {theme.palette.mode === "dark" ? t("darkMode") : t("lightMode")}
                </Typography>
              </Stack>
          </IconButton>
          
        
      </Box>
</Drawer>
  );
}
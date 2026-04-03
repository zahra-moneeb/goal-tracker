import { Drawer,List, ListItem, Toolbar, ListItemText,FormControl,Select,MenuItem, InputLabel, Typography } from "@mui/material"
import { useTheme, IconButton, ListItemButton ,ListItemIcon } from "@mui/material";
import { useContext } from "react";
import { tokens, ColorModeContext } from "../../theme";
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
    keepMounted: true, 
  }}

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1b1033 0%, #0b0618 100%)"
              : "linear-gradient(180deg, #f4f0ff 0%, #ece4ff 100%)",
            color: theme.palette.mode === "dark" ? "#f9f5ff" : "#1b1033",
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
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(27,16,51,0.06)",
                },
                "&.active": {
                  fontWeight: 600,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(124,77,255,0.22)"
                      : "rgba(103,58,183,0.16)",
                  color: "#ffffff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    theme.palette.mode === "dark"
                      ? "#d0bcff"
                      : colors.blueAccent[400],
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: 14,
                    letterSpacing: 0.3,
                  },
                }}
                primary={t(item.text)}
              />
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
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            borderRadius: 2,
            px: 1.5,
            color: "inherit",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(27,16,51,0.06)",
            },
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.2}>
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: 20 }} />
            ) : (
              <LightModeIcon sx={{ fontSize: 20 }} />
            )}

            <Typography
              variant="body2"
              sx={{ fontWeight: 500, letterSpacing: 0.3 }}
            >
              {theme.palette.mode === "dark" ? t("darkMode") : t("lightMode")}
            </Typography>
          </Stack>
        </IconButton>
      </Box>
</Drawer>
  );
}
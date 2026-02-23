import { Drawer,List, ListItem, Toolbar, ListItemText } from "@mui/material"
import {FormControl,Select,MenuItem, InputLabel}  from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ListItemButton } from "@mui/material";
import { tokens } from "../theme";


export default function SideBar(){
   const { t, i18n } = useTranslation();
  const theme = useTheme();
  const drawerWidth = 240 ;
  const colors = tokens(theme.palette.mode);

     return (

    <Drawer
        anchor={theme.direction === "rtl" ? "right" : "left"}
        variant="permanent"
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
          { text: "dashboard", path: "/dashboard" },
          { text: "goals", path: "/goals" },
          { text: "categories", path: "/categories" },
          { text: "settings", path: "/settings" },
        ].map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  fontWeight: "bold",
                  color: colors.blueAccent[500],
                },
              }}
            >
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
</Drawer>
  );
}
import React, { useContext } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Stack,
  useTheme,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens, ColorModeContext } from ".././theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  const isDarkMode = theme.palette.mode === "dark";
  const isRtl = theme.direction === "rtl";

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1400px", margin: "0 auto" }}>
      {/* Breadcrumbs for Navigation */}
      <Breadcrumbs
        separator={isRtl ? <NavigateBeforeIcon fontSize="small" /> : <NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2, color: colors.gray[100] }}
      >
        <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
          {t("dashboard")}
        </Link>
        <Typography color="text.primary">{t("settings")}</Typography>
      </Breadcrumbs>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SettingsIcon sx={{ fontSize: "2rem", color: colors.blueAccent[500] }} />
          <Typography variant="h2" fontWeight="bold" sx={{ color: colors.gray[300] }}>
            {t("settings")}
          </Typography>
        </Stack>
        <Typography variant="h5" sx={{ color: colors.greenAccent[400], mt: 1 }}>
          {t("manage_preferences")}
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Language Selection Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            border: `1px solid ${colors.gray[700]}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <LanguageIcon sx={{ color: colors.blueAccent[500] }} />
            <Typography variant="h4" fontWeight="600">
              {t("language")}
            </Typography>
          </Stack>

          <FormControl fullWidth variant="filled">
            <InputLabel id="language-label" sx={{ color: colors.gray[100] }}>
              {t("select_language")}
            </InputLabel>
            <Select
              labelId="language-label"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              sx={{ borderRadius: "4px" }}
            >
              <MenuItem value="en">English (EN)</MenuItem>
              <MenuItem value="fa">فارسی (FA)</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" sx={{ display: "block", mt: 1, color: colors.gray[300] }}>
            {t("language_helper_text")}
          </Typography>
        </Paper>

        {/* Appearance Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            border: `1px solid ${colors.gray[700]}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <PaletteIcon sx={{ color: colors.blueAccent[500] }} />
            <Typography variant="h4" fontWeight="600">
              {t("appearance")}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2, borderColor: colors.gray[700] }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="medium">
                {isDarkMode ? t("darkMode") : t("lightMode")}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray[300] }}>
                {t("toggle_theme_description")}
              </Typography>
            </Box>

            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                p: 2,
                backgroundColor: isDarkMode ? colors.gray[800] : colors.gray[900],
                "&:hover": { backgroundColor: colors.gray[700] },
                transition: "0.3s",
              }}
            >
              {isDarkMode ? (
                <DarkModeIcon sx={{ color: "#fadb14", fontSize: "25px" }} />
              ) : (
                <LightModeIcon sx={{ color: "#ff7a45", fontSize: "25px" }} />
              )}
            </IconButton>
          </Stack>
        </Paper>
      </Stack>

      {/* Footer Info */}
      <Box sx={{ mt: 5, textAlign: "center", color: colors.gray[400] }}>
        <Typography variant="caption">
          {t("app_version")}: 1.0.2 • {t("last_sync")}: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
}

// import { Drawer,List, ListItem, Toolbar, ListItemText,FormControl,Select,MenuItem, InputLabel, Typography } from "@mui/material"
// import { useTranslation } from "react-i18next";
// import { useContext } from "react";
// import { useTheme, IconButton, ListItemButton ,ListItemIcon } from "@mui/material";
// import { Box, Stack } from "@mui/system";
// import { tokens, ColorModeContext } from ".././theme"
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';  


// export default function Settings(){
//       const { t, i18n } = useTranslation();
//       const theme = useTheme();
//       const drawerWidth = 240 ;
//        const colorMode = useContext(ColorModeContext);
//       const colors = tokens(theme.palette.mode);

//     return(
//     <Box>
//                     <FormControl fullWidth sx={{ p: 1, mt: 5 }}>
//                   <InputLabel id="language-select-label">
//                     {t("language")}
//                   </InputLabel>
      
//                   <Select
//                     labelId="language-select-label"
//                     value={i18n.language}
//                     label={t("language")}
//                     onChange={(e) => i18n.changeLanguage(e.target.value)}
//                   >
//                     <MenuItem value="en">English</MenuItem>
//                     <MenuItem value="fa">فارسی</MenuItem>
//                   </Select>
//             </FormControl>

//                   <IconButton onClick={colorMode.toggleColorMode}>
//                         <Stack direction="row" alignItems="center" gap={1}>
//                             {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            
//                             <Typography variant="body2" >
//                             {theme.palette.mode === "dark" ? t("darkMode") : t("lightMode")}
//                             </Typography>
//                           </Stack>
//                       </IconButton>
//     </Box>
//     )
// }
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Stack,
  useTheme,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  Grid,
  Switch,
  Avatar,
  Button,
  Zoom,
  Fab,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens, ColorModeContext } from ".././theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const [hasChanges, setHasChanges] = useState(false);

  const isDarkMode = theme.palette.mode === "dark";
  const isRtl = theme.direction === "rtl";

  const handleUpdate = () => {
    setHasChanges(true);
  };

  const SettingSection = ({ icon, title, description, children }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: isDarkMode 
            ? "radial-gradient(circle at top, #3c096c 0%, #0b0618 45%, #02010a 100%)"
            : "radial-gradient(circle at top, #56345c 0%, #dfdce2 45%, #ffffff 100%)",
        borderRadius: "16px", 
        border: `1px solid ${colors.gray[800]}`,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: colors.blueAccent[500],
          transform: "translateY(-2px)",
        },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                display: "flex",
                p: 1.5,
                mr: 4,
                borderRadius: "12px",
                backgroundColor: isDarkMode ? colors.primary[500] : colors.gray[900],
                color: colors.blueAccent[500],
              }}
            >
              {icon}
            </Box>
            <Box sx={{pr:3}}>
              <Typography variant="h5" fontWeight="600" color={colors.gray[100]}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray[400], mt: 0.5 }}>
                {description}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: "flex", justifyContent: { md: "flex-end" } }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
      
    
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: "16px", 
          background: isDarkMode 
            ? "radial-gradient(circle at top, #3c096c 0%, #0b0618 45%, #02010a 100%)"
            : "radial-gradient(circle at top, #56345c 0%, #dfdce2 45%, #ffffff 100%)",
          border: `1px solid ${colors.gray[800]}`
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: colors.blueAccent[500],
              fontSize: "2rem",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
            }}
          >
            JD
          </Avatar>
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              John Doe
            </Typography>
            <Typography variant="h6" color={colors.greenAccent[400]}>
              Administrator
            </Typography>
            <Typography variant="body2" color={colors.gray[400]}>
              john.doe@example.com
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            variant="outlined" 
            color="inherit" 
            
            startIcon={<PersonIcon />}
            sx={{ borderRadius: "8px", pr: 3 ,borderColor: colors.gray[700] }}
          >
            Edit Profile
          </Button>
        </Stack>
      </Paper>

    
      <Breadcrumbs
        separator={isRtl ? <NavigateBeforeIcon fontSize="small" /> : <NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3, color: colors.gray[400] }}
      >
        <Link underline="hover" color="inherit" href="/" sx={{ fontSize: "0.8rem" }}>Dashboard</Link>
        <Typography sx={{ fontSize: "0.8rem" }} color="text.primary">{t("settings")}</Typography>
      </Breadcrumbs>

      <Stack spacing={2}>
      
        <SettingSection
          icon={<PaletteIcon />}
          title={t("appearance")}
          description="Customize how the interface looks on your device."
        >
          <IconButton
            onClick={() => { colorMode.toggleColorMode(); handleUpdate(); }}
            sx={{
              p: 1.5,
              borderRadius: "10px",
              border: `1px solid ${colors.gray[700]}`,
              backgroundColor: colors.primary[500],
            }}
          >
            {isDarkMode ? <DarkModeIcon sx={{ color: "#fadb14" }} /> : <LightModeIcon sx={{ color: "#ff7a45" }} />}
          </IconButton>
        </SettingSection>

        {/* Language */}
        <SettingSection
          icon={<LanguageIcon />}
          title={t("language")}
          description="Set your preferred language for the dashboard."
        >
          <FormControl variant="outlined" sx={{ minWidth: 160 }}>
            <Select
              value={i18n.language}
              onChange={(e) => { i18n.changeLanguage(e.target.value); handleUpdate(); }}
              size="small"
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="en">English (EN)</MenuItem>
              <MenuItem value="fa">فارسی (FA)</MenuItem>
            </Select>
          </FormControl>
        </SettingSection>

   
        <SettingSection
          icon={<NotificationsIcon />}
          title="Notifications"
          description="Get notified about important updates and activity."
        >
          <Switch defaultChecked color="secondary" onChange={handleUpdate} />
        </SettingSection>
      </Stack>

      {/* Footer Info */}
      <Box sx={{ mt: 6, textAlign: "center", color: colors.gray[500], pb: 10 }}>
        <Typography variant="caption" sx={{ display: "block" }}>
          {t("app_version")}: 1.0.2 • {t("last_sync")}: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

    
      <Zoom in={hasChanges}>
        <Fab
          variant="extended"
          color="secondary"
          aria-label="save"
          onClick={() => setHasChanges(false)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
          }}
        >
          <SaveIcon sx={{ mr: 1 }} />
          Save Changes
        </Fab>
      </Zoom>
    </Box>
  );
}


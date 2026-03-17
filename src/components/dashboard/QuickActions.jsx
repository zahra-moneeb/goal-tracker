import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Box,
  useTheme
} from "@mui/material";
import { Add, List, ArrowForward, Settings, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { alpha } from "@mui/material/styles";

export default function QuickActions() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  
  const isDark = theme.palette.mode === "dark";
  const isRtl = theme.direction === "rtl"; 

  const palette = {
    primary: isDark ? "#00f2fe" : theme.palette.primary.main,
    secondary: "#a855f7",
    settings: "#94a3b8",
    cardBg: isDark ? "#111827" : "#ffffff",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  };

  const actions = [
    {
      title: t("addGoal"),
      desc: t("addGoalDescription"),
      path: "/goals/new",
      icon: <Add fontSize="large" />,
      color: palette.primary,
      btnText: t("addGoal")
    },
    {
      title: t("allGoals"),
      desc: t("viewGoalsDescription"),
      path: "/goals",
      icon: <List fontSize="large" />,
      color: palette.secondary,
      btnText: t("view")
    },
    {
      title: t("settings"),
      desc: t("settingsDescription") || "Configure your preferences and account security.",
      path: "/settings",
      icon: <Settings fontSize="large" />,
      color: palette.settings,
      btnText: t("openSettings") || "Manage"
    }
  ];

  return (
    <Box sx={{ p: 2, mt: 4, width: "100%" }}>

      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Box 
          sx={{ 
            width: 4, 
            height: 32, 
            borderRadius: 2, 
            backgroundColor: palette.primary,
            boxShadow: `0 0 10px ${alpha(palette.primary, 0.5)}`,
            order: isRtl ? 1 : 0 
          }} 
        />
        <Box sx={{ textAlign: isRtl ? "right" : "left" }}>
          <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: "-0.5px" }}>
            {t("quickActions") || "Management"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("quickActionsSubtitle") || "Tools to help you create and monitor your objectives."}
          </Typography>
        </Box>
      </Box>

 
      <Grid container spacing={3} sx={{ width: "100%", margin: 0, direction: theme.direction }}>
        {actions.map((action, index) => (
          <Grid item xs={12} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              onClick={() => navigate(action.path)}
              sx={{
                flex: 1,
                width: "100%",
                borderRadius: "20px",
                backgroundColor: palette.cardBg,
                border: `1px solid ${palette.border}`,
                boxShadow: isDark ? "none" : "0 10px 15px -3px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 30px ${alpha(action.color, 0.15)}`,
                }
              }}
            >
              <CardContent sx={{ 
                p: 4, 
                flexGrow: 1, 
                display: "flex", 
                flexDirection: "column",
                alignItems: isRtl ? "flex-end" : "flex-start", 
                textAlign: isRtl ? "right" : "left"
              }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${alpha(action.color, 0.2)} 0%, ${alpha(action.color, 0.05)} 100%)`,
                    color: action.color,
                    mb: 3,
                    border: `1px solid ${alpha(action.color, 0.2)}`
                  }}
                >
                  {action.icon}
                </Box>

                <Typography variant="h5" fontWeight="700" gutterBottom sx={{ width: "100%" }}>
                  {action.title}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 4, minHeight: "48px", lineHeight: 1.6, width: "100%" }}
                >
                  {action.desc}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                
                  endIcon={isRtl ? <ArrowBack /> : <ArrowForward />} 
                  sx={{
                    mt: "auto",
                    borderRadius: "12px",
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: alpha(action.color, 0.12),
                    color: isDark ? (index === 2 ? "#fff" : action.color) : theme.palette.text.primary,
                    boxShadow: "none",
                    flexDirection: isRtl ? "row-reverse" : "row", 
                    "&:hover": { 
                      backgroundColor: action.color, 
                      color: "#000",
                    }
                  }}
                >
                  {action.btnText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

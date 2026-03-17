import React, { useMemo } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CircularProgress, 
  useTheme, 
  alpha 
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TrendingUp, LocalFireDepartment, AutoGraph, ArrowDropUp } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";

function CircularProgressWithLabel({ value, color }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={100} size={38} thickness={4} sx={{ color: (theme) => alpha(color, 0.1) }} />
      <CircularProgress variant="determinate" value={value} size={38} thickness={4} sx={{ color, strokeLinecap: "round", position: "absolute", left: 0 }} />
    </Box>
  );
}

const DashboardSummary = ({ goals = [] }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isRtl = theme.direction === "rtl";

  const palette = {
    completion: "#00f2fe",
    streak: "#ff5f6d",
    xp: "#a855f7",
    cardBg: isDark ? "#111827" : "#ffffff",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: isDark ? "#ffffff" : "#1f2937"
  };

  const { stats, historyData } = useMemo(() => {
    const defaultData = [20, 45, 38, 70, 52, 85, 95];
    if (!goals || goals.length === 0) {
      return { stats: { completion: 0, streak: 0, xp: 0 }, historyData: defaultData };
    }
    let cur = 0, tar = 0, strk = 0, xpTotal = 0;
    goals.forEach(g => {
      cur += g.current || 0; tar += g.target || 0;
      strk += g.streak || 0; xpTotal += g.xp || 0;
    });
    return {
      stats: { completion: tar > 0 ? Math.round((cur / tar) * 100) : 0, streak: strk, xp: xpTotal },
      historyData: defaultData
    };
  }, [goals]);

  const cards = [
    { id: "progress", title: t("overallCompletion"), value: stats.completion, unit: "%", color: palette.completion, icon: <AutoGraph />, showFullChart: true },
    { id: "streak", title: t("streak"), value: stats.streak, unit: t("days"), color: palette.streak, icon: <LocalFireDepartment />, showFullChart: false },
    { id: "xp", title: t("totalXP"), value: stats.xp, unit: "XP", color: palette.xp, icon: <TrendingUp />, showFullChart: false }
  ];

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          flexWrap: { xs: 'wrap', md: 'nowrap' }, 
          direction: theme.direction,
          width: "100%",
          margin: 0
        }}
      >
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index} sx={{ minWidth: { md: '33.33%' }, display: 'flex' }}>
            <Card sx={{ 
              flex: 1,
              borderRadius: "24px", 
              backgroundColor: palette.cardBg, 
              border: `1px solid ${palette.border}`,
              display: "flex",
              flexDirection: "column",
              height: "260px", // Increased fixed height to accommodate the chart axes
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-5px)", boxShadow: `0 12px 30px ${alpha(card.color, 0.12)}` }
            }}>
              <Box sx={{ p: 3, pb: 1, textAlign: isRtl ? "right" : "left" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <Box sx={{ p: 1, borderRadius: "10px", backgroundColor: alpha(card.color, 0.1), color: card.color, display: 'flex' }}>
                    {card.icon}
                  </Box>
                  <CircularProgressWithLabel value={card.value > 100 ? 100 : card.value} color={card.color} />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <Typography variant="h4" fontWeight="800">
                    {card.value.toLocaleString()}
                    <Typography component="span" variant="body1" sx={{ ml: 0.5, opacity: 0.5, fontWeight: 700 }}>{card.unit}</Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#10b981', backgroundColor: alpha('#10b981', 0.1), borderRadius: '6px', px: 0.5 }}>
                    <ArrowDropUp fontSize="small" />
                    <Typography variant="caption" fontWeight="800">12%</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: 1 }}>{card.title}</Typography>
              </Box>

              {card.showFullChart ? (
                <Box sx={{ height: 120, width: "100%", mt: "auto", px: 1, direction: 'ltr' }}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], scaleType: 'point' }]}
                    series={[{
                      data: historyData,
                      area: true,
                      color: card.color,
                      showMark: true, // Shows individual dots
                    }]}
                    height={130}
                    margin={{ top: 10, bottom: 25, left: 30, right: 10 }}
                    hideLegend
                    disableAxisListener
                    sx={{
                      ".MuiLineElement-root": { strokeWidth: 3 },
                      ".MuiAreaElement-root": { fill: `url(#gradient-f-${index})`, fillOpacity: 0.2 },
                      ".MuiChartsAxis-tickLabel": { fill: alpha(palette.text, 0.5), fontSize: 10, fontWeight: 600 },
                      ".MuiChartsAxis-line": { stroke: alpha(palette.text, 0.1) },
                      ".MuiChartsAxis-tick": { stroke: alpha(palette.text, 0.1) },
                    }}
                  >
                    <defs>
                      <linearGradient id={`gradient-f-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={card.color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={card.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </Box>
              ) : (
                // Fill the space for non-chart cards to keep layouts identical
                <Box sx={{ mt: 'auto', p: 3, opacity: 0.1, display: 'flex', justifyContent: 'center' }}>
                   <AutoGraph sx={{ fontSize: 80, color: card.color, transform: 'rotate(-10deg)' }} />
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardSummary;
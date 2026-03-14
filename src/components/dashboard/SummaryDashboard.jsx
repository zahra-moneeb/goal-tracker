import React, { useMemo } from "react";
import { Box, Typography, Stack, Card, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";

// دایره progress با درصد وسط
function CircularProgressWithLabel({ value, color }) {
 
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={80}
        thickness={5}
        sx={{ color }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const DashboardSummary = ({ goals = [] }) => {
   const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const green = colors?.greenAccent?.[500] ?? "#4cceac";

  // محاسبه داده‌های داشبورد
  const { overallCompletion, streakDays, totalXP } = useMemo(() => {

    if (!goals.length) {
      return { overallCompletion: 0, streakDays: 0, totalXP: 0 };
    }

    let totalCurrent = 0;
    let totalTarget = 0;
    let totalStreak = 0;
    let xp = 0;

    goals.forEach((goal) => {
      totalCurrent += goal.current || 0;
      totalTarget += goal.target || 0;

      totalStreak += goal.streak || 0;
      xp += goal.xp || 0;
    });

    const completion =
      totalTarget > 0
        ? Math.round((totalCurrent / totalTarget) * 100)
        : 0;

    return {
      overallCompletion: completion,
      streakDays: totalStreak,
      totalXP: xp,
    };

  }, [goals]);

  const cards = [
    {
      title: t("overallCompletion"),
      value: overallCompletion,
      type: "circle"
    },
    {
      title: t("streak"),

      value: streakDays,
      unit: t("days")
    },
    {
      title: t("totalXP"),
      value: totalXP,
      unit: "XP"
    }
  ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.mode === "dark"
          ? "#1f2a40"
          : "#e0e0e0",
      }}
    >

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
      >

        {cards.map((card, index) => (

          <Card
            key={index}
            sx={{
              flex: 1,
              minHeight: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              borderRadius: 3,
            }}
          >

            {card.type === "circle" ? (

              <>
                <CircularProgressWithLabel
                  value={card.value}
                  color={green}
                />

                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    {card.title}
                  </Typography>

                  <Typography variant="h6">
                    {card.value}% {t("completed")}
                  </Typography>
                </Box>
              </>

            ) : (

              <Box sx={{ textAlign: "center" }}>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography variant="h5">
                  {card.value} {card.unit}
                </Typography>

              </Box>

            )}

          </Card>

        ))}

      </Stack>

    </Box>
  );
};

export default DashboardSummary;
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import GoalCard from "../goals/GoalCard";
import { useTranslation } from "react-i18next";

export default function ActiveGoals({ goals, onDelete, addProgress, onToggle }) {
  const { t } = useTranslation();

  const activeGoals = (goals ?? []).filter(
    (goal) => goal?.status?.toLowerCase() === "active"
  );

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        {t("activeGoals")}
      </Typography>

      {activeGoals.length === 0 ? (
        <Typography color="text.secondary">
          {t("noActiveGoals")}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {activeGoals.map((goal) => {
            const percent = Math.min(
              (goal.current / goal.target) * 100,
              100
            );

            return (
              <Grid item xs={12} md={6} lg={4} key={goal.id}>
                <GoalCard
                  goal={goal}
                  percent={percent}
                  onDelete={onDelete}
                  addProgress={addProgress}
                  onToggle={onToggle}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
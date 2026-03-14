import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Box
} from "@mui/material";
import { Add, List, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function QuickActions() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cardStyle = {
    borderRadius: 4,
    p: 1,
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 6
    }
  };

  const iconBox = (color) => ({
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color,
    color: "#fff"
  });

  return (
    <Grid container spacing={3} mb={4}>

      {/* Add Goal */}
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardContent>
            <Stack spacing={2} alignItems="center">

              <Box sx={iconBox("#1976d2")}>
                <Add fontSize="large" />
              </Box>

              <Typography variant="h6" fontWeight={600}>
                {t("addGoal")}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t("addGoalDescription")}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/goals/new")}
              >
                {t("addGoal")}
              </Button>

            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* View Goals */}
      <Grid item xs={12} sm={4}>
        <Card sx={cardStyle}>
          <CardContent>
            <Stack spacing={2} alignItems="center">

              <Box sx={iconBox("#2e7d32")}>
                <List fontSize="large" />
              </Box>

              <Typography variant="h6" fontWeight={600}>
                {t("allGoals")}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t("viewGoalsDescription")}
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/goals")}
              >
                {t("view")}
              </Button>

            </Stack>
          </CardContent>
        </Card>
      </Grid>

  


    </Grid>
  );
}
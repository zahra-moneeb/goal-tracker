import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { getCategoryStats } from "../../utils/categoryStats";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CategoryIcon from "@mui/icons-material/Category";

const iconMap = {
  Work: <WorkIcon fontSize="large" />,
  Study: <SchoolIcon fontSize="large" />,
  Health: <FitnessCenterIcon fontSize="large" />,
  Personal: <FavoriteIcon fontSize="large" />,
};

export default function CategoryCards({ goals }) {
  const categories = getCategoryStats(goals);

  return (
    <Grid container spacing={3}>
      {categories.map((cat) => (
        <Grid item xs={12} md={6} lg={4} key={cat.category}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
              minWidth: 250 // wider cards
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                {iconMap[cat.category] || <CategoryIcon fontSize="large" />}
                <Typography variant="h6" fontWeight="bold">{cat.category}</Typography>
              </Box>

              <Typography color="text.secondary">Active: {cat.active}</Typography>
              <Typography color="success.main">Completed: {cat.completed}</Typography>
              <Typography color="text.secondary">Total: {cat.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
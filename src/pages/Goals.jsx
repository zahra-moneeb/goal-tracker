import GoalCard from "../components/GoalCard";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography } from "@mui/material";

export default function Goals() {
  const { t } = useTranslation();

  const defaultGoals = [
    {
      id: 1,
      title: "Learn React",
      description: "Finish React course",
      deadline: "2026-03-01",
      status: "active",
      xp: 50,
      streak: 3,
    },
  ];
  
  const [goals, setGoals] = useState(defaultGoals);

  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem("goals");
      if (savedGoals) {
        const parsed = JSON.parse(savedGoals) || [];
        setGoals(parsed.length > 0 ? parsed : defaultGoals);
      }
    } catch (error) {
      console.error("Failed to parse goals from localStorage:", error);
      setGoals(defaultGoals);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("goals", JSON.stringify(goals));
    } catch (error) {
      console.error("Failed to save goals to localStorage:", error);
    }
  }, [goals]);

  // حذف یک کارت
  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

  // ویرایش یک کارت
  const handleEdit = (goal) => console.log("Edit clicked:", goal);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("goals")}
      </Typography>
      <Grid container spacing={2}>
        {goals.map((goal) => (
          <Grid sm={6} md={4} key={goal.id}>
            <GoalCard goal={goal} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
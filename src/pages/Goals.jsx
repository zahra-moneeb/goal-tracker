import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography } from "@mui/material";

export default function Goals() {
  const { t } = useTranslation();

  // const defaultGoals = [
  
  // ];
  
 const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : [
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
  });

useEffect(() => {
  localStorage.setItem("goals", JSON.stringify(goals));
}, [goals]);

  // useEffect(() => {
  //   try {
  //     const savedGoals = localStorage.getItem("goals");
  //     if (savedGoals) {
  //       const parsed = JSON.parse(savedGoals) || [];
  //       setGoals(parsed.length > 0 ? parsed : defaultGoals);
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse goals from localStorage:", error);
  //     setGoals(defaultGoals);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("goals", JSON.stringify(goals));
  //   } catch (error) {
  //     console.error("Failed to save goals to localStorage:", error);
  //   }
  // }, [goals]);

  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
};
  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

  // ویرایش یک کارت
  const handleEdit = (goal) => console.log("Edit clicked:", goal);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("goals")}
      </Typography>

      <GoalCard onAddGoal={handleAddGoal} />

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
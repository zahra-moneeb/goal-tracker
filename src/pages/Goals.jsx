import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

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
  const [showForm, setShowForm] = useState(false);

  
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

  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    setShowForm(false); 
  };

  // حذف کارت
  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

 
  const handleEdit = (goal) => console.log("Edit clicked:", goal);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t("goals")}
      </Typography>

      
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? t("cancel") : t("addGoal")}
      </Button>

      
      {showForm && <GoalForm onAddGoal={handleAddGoal} />}

     
      <Grid container spacing={2}>
        {goals.map((goal) => (
          <Grid key={goal.id} sm={6} md={4}>
            <GoalCard goal={goal} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoalDetails from "./GoalDetails";

import GoalList from "../components/GoalList";
import GoalForm from "../components/GoalForm";

export default function Goals() {
  const { t } = useTranslation();

  const defaultGoals = [
    {
    id: 1,
    title: "Learn React",
    category: "React Course",
    deadline: "2026-03-01",
    status: "Active",   // Active / Paused / Completed
    xp: 50,
    streak: 3,
    current: 5,         // تعداد روزهای طی شده
    target: 30,         // تعداد روزهای هدف
  },
  ];

  const [goals, setGoals] = useState(defaultGoals);
  const [showForm, setShowForm] = useState(false);

  
 useEffect(() => {
  try {
    const savedGoals = localStorage.getItem("goals");

    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);

      if (Array.isArray(parsed)) {
        setGoals(parsed.length > 0 ? parsed : defaultGoals);
      } else {
        setGoals(defaultGoals);
      }

    } else {
      setGoals(defaultGoals);
    }

  } catch (error) {
    console.error("Failed to parse goals from localStorage:", error);
    setGoals(defaultGoals);
  }
}, []);




  // حذف کارت
  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

 
  const handleEdit = (goal) => console.log("Edit clicked:", goal);

    const handleAddGoal = (newGoal) => {
      console.log("NEW GOAL:", newGoal);
    setGoals((prev) => [...prev, newGoal]);
    setShowForm(false); 
  };

  return (
    <Container maxWidth={false} >
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
       
      <Grid  spacing={2}>
        <Grid item xs={12}>
          <GoalList goals={goals}  />
           <GoalDetails goals={goals} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>
      </Grid>
 
    </Container>
  );
}
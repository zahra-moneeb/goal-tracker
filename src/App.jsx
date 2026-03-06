import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next";
import Dashboard from "./pages/Dashboard"
import GoalForm from "./components/GoalForm"
import Goals from "./pages/Goals"
import NewGoal from "./pages/NewGoal"
import GoalDetails from "./pages/GoalDetails"
import Categories from "./pages/Categories"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import MainLayout from "./layout/MainLayout"

function App() {
  const [theme, colorMode] = useMode();
   const { i18n } = useTranslation();
   
  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);  

  //useState for sending goals data to goals.jsx and goal details.jsx
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
    target: 30,    
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    color: "#6C63FF",
    notes: "Learning React basics",    
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


  const handleDelete = (id)=>{
     const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
     if (confirmDelete){
       setGoals((prev) => prev.filter((goal) => goal.id !== id))

     }
  }
  // (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id)
     

  // if (confirmDelete) {
  //   onDelete(goal.id);
  // }


 
 const handleEdit = (updatedGoal) => {
  setGoals(prevGoals =>
    prevGoals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    )
  );
};

    const handleAddGoal = (newGoal) => {
      console.log("NEW GOAL:", newGoal);
    setGoals((prev) => [...prev, newGoal]);
    setShowForm(false); 
  };
  
  // handle progress bare
const handleProgress = (id) => {
  setGoals((prevGoals) =>
    prevGoals.map((goal) => {
      if (goal.id !== id) return goal;

      if (goal.status === "Paused" || goal.status === "Completed") {
      return goal;
      }
      // ❌ اگر قبلاً کامل شده، کاری نکن
      if (goal.status === "Completed") return goal;

      const newCurrent = goal.current + 1;
      const reachedTarget = newCurrent >= goal.target;

      const today = new Date().toDateString();

      let newStreak = goal.streak || 0;
      let newLastLoggedDate = goal.lastLoggedDate;

      // 🔥 فقط برای daily streak حساب شود
      if (goal.goalType === "daily") {
        const lastDate = goal.lastLoggedDate
          ? new Date(goal.lastLoggedDate).toDateString()
          : null;

        if (!lastDate) {
          newStreak = 1;
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastDate === yesterday.toDateString()) {
            newStreak += 1;
          } else if (lastDate !== today) {
            newStreak = 1;
          }
        }

        newLastLoggedDate = today;
      }

      return {
        ...goal,
        current: reachedTarget ? goal.target : newCurrent, // جلو overflow
        status: reachedTarget ? "Completed" : goal.status,
        xp: (goal.xp || 0) + 20 + (reachedTarget ? 50 : 0), // 🎁 bonus XP
        streak: newStreak,
        lastLoggedDate: newLastLoggedDate,
      };
    })
  );
};

//for toggle passed goals button
function togglePause(goalId) {
  setGoals(prevGoals =>
    prevGoals.map(goal => {
      if (goal.id !== goalId) return goal;

   
      if (goal.status === "Active") {
        return { ...goal, status: "Paused" };
      } else if (goal.status === "Paused") {
        return { ...goal, status: "Active" };
      } else {
        return goal;
      }
    })
  );
}

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <div className="app">
          <main className="content">
            <Routes>
              <Route element={<MainLayout/>}>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/goals" element={<Goals goals={goals} onDelete={handleDelete} onEdit={handleEdit} onAddGoal={handleAddGoal} setShowForm={setShowForm} showForm={showForm} addProgress={handleProgress} onToggle={togglePause }/>} />
                <Route path="/goals/edit/:id" element={<GoalForm goals={goals} onEdit={handleEdit} onAddGoal={handleAddGoal} setShowForm={setShowForm}/>}/>
                <Route path="/goals/new" element={<GoalForm onAddGoal={handleAddGoal} onEdit={handleEdit} setShowForm={setShowForm}/>}/>
                <Route path="/goals/:id" element={<GoalDetails goals={goals} onDelete={handleDelete} onEdit={handleEdit} addProgress={handleProgress} onToggle={togglePause }/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/settings" element={<Settings/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Route>
       
    </Routes>
          </main>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider> 
   
  )
}

export default App

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

  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

 
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
                <Route path="/goals" element={<Goals goals={goals} onDelete={handleDelete} onEdit={handleEdit} onAddGoal={handleAddGoal} setShowForm={setShowForm} showForm={showForm}/>} />
                <Route path="/goals/edit/:id" element={<GoalForm goals={goals} onEdit={handleEdit} onAddGoal={handleAddGoal}/>}/>
                <Route path="/goals/new" element={<NewGoal/>}/>
                <Route path="/goals/:id" element={<GoalDetails goals={goals} onDelete={handleDelete} onEdit={handleEdit}/>}/>
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

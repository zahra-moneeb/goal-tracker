import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard"
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
                <Route path="/goals" element={<Goals/>}/>
                <Route path="/goals/new" element={<NewGoal/>}/>
                <Route path="/goals/:id" element={<GoalDetails/>}/>
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

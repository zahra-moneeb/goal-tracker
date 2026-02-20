import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Goals from "./pages/Goals"
import NewGoal from "./pages/NewGoal"
import GoalDetails from "./pages/GoalDetails"
import Categories from "./pages/Categories"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import MainLayout from "./layout/MainLayout"

function App() {


  return (
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
  )
}

export default App

import DashboardSummary from "../components/dashboard/SummaryDashboard";
import QuickActions from "../components/dashboard/QuickActions";
import ActiveGoals from "../components/dashboard/ActiveGoals";
import CompletedGoals from "../components/dashboard/CompletedGoals";
import ArchivedGoals from "../components/dashboard/ArchivedGoals";
export default function Dashboard({ goals, onDelete, addProgress, onToggle, handleArchive, handleRestore }) {
  return (
  <>
    <DashboardSummary goals={goals} />
    <QuickActions />

    <ActiveGoals
      goals={goals}
      onDelete={onDelete}
      addProgress={addProgress}
      onToggle={onToggle}
    />
    <CompletedGoals
      goals={goals}
      onArchive={handleArchive}
   
    />
    <ArchivedGoals goals={goals} 
    onRestore={handleRestore} />

  </>
  );
}
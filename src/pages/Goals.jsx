
import { Container, Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoalDetails from "./GoalDetails";

import GoalList from "../components/GoalList";
import GoalForm from "../components/GoalForm";

export default function Goals({ goals, onDelete,  setShowForm, showForm , onAddGoal,}) {
  const { t } = useTranslation();


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

       
        {showForm && <GoalForm goals={goals} onAddGoal={onAddGoal} onDelete={onDelete} />}
       
      <Grid  spacing={2}>
        <Grid item xs={12}> 
          <GoalList goals={goals} onDelete={onDelete}  />
           {/* <GoalDetails goals={goals} onEdit={handleEdit} onDelete={handleDelete} /> */}
        </Grid>
      </Grid>
 
    </Container>
  );
}
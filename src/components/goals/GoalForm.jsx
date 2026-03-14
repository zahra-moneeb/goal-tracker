import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function GoalForm({ goals, onAddGoal, onEdit, setShowForm }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isEditMode = Boolean(id);

  const existingGoal = goals?.find((g) => g.id === Number(id));

  const [title, setTitle] = useState(existingGoal?.title || "");
  const [category, setCategory] = useState(existingGoal?.category || "");
  const [goalType, setGoalType] = useState(existingGoal?.goalType || "daily");
  const [target, setTarget] = useState(existingGoal?.target || "");
  const [startDate, setStartDate] = useState(existingGoal?.startDate || "");
  const [endDate, setEndDate] = useState(existingGoal?.endDate || "");
  const [color, setColor] = useState(existingGoal?.color || "");
  const [notes, setNotes] = useState(existingGoal?.notes || "");

  const handleCancel = () => {
    if (setShowForm) {
      setShowForm(false);
    } else {
      navigate(-1);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !category) return;
    let goalData;

if (isEditMode) {
  goalData = {
    ...existingGoal,  // keep everything old
    title: title.trim(),
    category,
    goalType,
    target: Number(target),
    startDate,
    endDate: endDate || null,
    color,
    notes,
    lastLoggedDate: null,
  };

  onEdit(goalData);
  navigate(`/goals/${id}`);

} else {
  goalData = {
    id: Date.now(),
    title: title.trim(),
    category,
    goalType,
    target: Number(target),
    startDate,
    endDate: endDate || null,
    color,
    notes,
    status: "Active",
    current: 0,
    xp: 0,
    streak: 0,
    lastLoggedDate: null,
  };

  onAddGoal(goalData);
  navigate("/goals");
}

 
    setTitle("");
    setCategory("");
    setGoalType("daily");
    setTarget("");
    setStartDate("");
    setEndDate("");
    setColor("");
    setNotes("");
  }


  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: { sm: 600, md: 800 },
        mx: "auto",
        px: { xs: 2, sm: 4 },
        py: { xs: 2.5, sm: 3.5 },
        mb: 4,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 18px 40px rgba(0,0,0,0.75)"
            : "0 10px 30px rgba(15,23,42,0.1)",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1b1033 0%, #0b0618 60%, #02010a 100%)"
            : "linear-gradient(135deg, #fdfbff 0%, #ede7f6 60%, #ffffff 100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={isMobile ? 2 : 3}
          sx={{ mb: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.6,
              mb: 0.5,
            }}
          >
            {isEditMode ? t("editGoal") : t("addGoal")}
          </Typography>
          
          <TextField
            label={t("title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            select
            label={t("category")}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="Health">{t("health")}</MenuItem>
            <MenuItem value="Study">{t("study")}</MenuItem>
            <MenuItem value="Work">{t("work")}</MenuItem>
            <MenuItem value="Personal">{t("personal")}</MenuItem>
          </TextField>

          <FormControl>
            <FormLabel>{t("goalType")}</FormLabel>
            <RadioGroup
              row
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
            >
              <FormControlLabel value="daily" control={<Radio />} label={t("daily")} />
              <FormControlLabel value="count" control={<Radio />} label={t("countBased")} />
              <FormControlLabel value="time" control={<Radio />} label={t("timeBased")} />
            </RadioGroup>
          </FormControl>

          <TextField
            label={t("target")}
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <TextField
            label="End Date (optional)"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Color (optional)"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Notes (optional)"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
          />
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            justifyContent="flex-end"
            sx={{ pt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {isEditMode ? t("editGoal") : t("addGoal")}
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              size="large"
            >
              {t("cancel")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}




// import React from 'react';
// import { TextField, Button, Paper, Stack} from '@mui/material';


// export default function GoalForm({onAddGoal}) {
//     const [title, setTitle] = React.useState('');
//     const [category, setCategory] = React.useState('');
//     const [deadline, setDeadline] = React.useState('');

    

//     function handleSubmit(e) {
//         e.preventDefault();
//         //   const cleanTitle = title.trim();
//         if (!title.trim()) return 


//                 const newGoal = {
//                 id: Date.now(),
//                 title: title.trim(),
//                 category: "General",
//                 deadline,
//                 status: "active",
//                 xp: 0,
//                 streak: 0,
//                 current: 0,
//                 target: 30,
//                 };

//                 onAddGoal(newGoal);

//                 setTitle("");
//                 setCategory("");
//                 setDeadline("");

//     }

//     return(
//         <Paper sx={{ p: 2, mb: 4 }}>
//             <form onSubmit={handleSubmit}> 
//                 <Stack spacing={2}>
//                     <TextField
//                         label="Title"
//                         value={title}
//                         onChange={(e)=> setTitle(e.target.value)}
//                         fullWidth
//                     />

//                      <TextField
//                         label="Category"
//                         value={category}
//                         onChange={(e)=> setCategory(e.target.value)}
//                         fullWidth
//                     />

//                      <TextField
//                         type='date'
//                         value={deadline}
//                         onChange={(e)=> setDeadline(e.target.value)}
//                         fullWidth
//                     />

//                     <Button type='submit' variant='contained'>
//                         Add Goal
//                     </Button>
//                 </Stack>
//             </form>
//         </Paper>

//     )
// }
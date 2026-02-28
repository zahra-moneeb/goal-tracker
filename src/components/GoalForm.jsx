import React from "react";
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
} from "@mui/material";

export default function GoalForm({ onAddGoal }) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [goalType, setGoalType] = React.useState("daily");
  const [target, setTarget] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [color, setColor] = React.useState("");
  const [notes, setNotes] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !category) return;

    const newGoal = {
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
    };

    onAddGoal(newGoal);

    // Reset form
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
    <Paper   sx={{
    width: "100%",
    maxWidth: { sm: 600, md: 800 },
    mx: "auto",
    px: { xs: 2, sm: 4 },
    py: { xs: 2, sm: 3 },
    mb: 4,
  }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          
          {/* Title */}
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          {/* Category */}
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </TextField>

          {/* Goal Type */}
          <FormControl>
            <FormLabel>Goal Type</FormLabel>
            <RadioGroup
              row
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
            >
              <FormControlLabel value="daily" control={<Radio />} label="Daily" />
              <FormControlLabel value="count" control={<Radio />} label="Count-based" />
              <FormControlLabel value="time" control={<Radio />} label="Time-based" />
            </RadioGroup>
          </FormControl>

          {/* Target */}
          <TextField
            label="Target"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            fullWidth
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          {/* End Date (optional) */}
          <TextField
            label="End Date (optional)"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* Color */}
          <TextField
            label="Color (optional)"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* Notes */}
          <TextField
            label="Notes (optional)"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Add Goal
          </Button>
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
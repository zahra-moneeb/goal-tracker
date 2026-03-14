import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryCards from "../components/category/CategoryCards";
import CategoryChart from "../components/category/CategoryChart";

export default function Categories({ goals, setGoals }) {

  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

   
    const newGoal = {
      id: Date.now(),
      title: "New Goal",
      category: newCategory.trim(),
      status: "Active",
      xp: 0,
      streak: 0,
      current: 0,
      target: 1,
      archived: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      color: "#6C63FF",
      notes: "",
      history: [],
    };

    setGoals([...goals, newGoal]);
    setNewCategory("");
    setOpen(false);
  };

  return (
    <Box p={3}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Categories</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </Box>

 
      <CategoryCards goals={goals} />

     
      <Box mt={5}>
        <CategoryChart goals={goals} />
      </Box>

 <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
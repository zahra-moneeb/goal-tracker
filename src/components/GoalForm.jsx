import React from 'react';
import { TextField, Button, Paper, Stack} from '@mui/material';


export default function GoalForm({onAddGoal}) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [deadline, setDeadline] = React.useState('');

    

    function handleSubmit(e) {
        e.preventDefault();
        //   const cleanTitle = title.trim();
        if (!title.trim()) return 


                const newGoal = {
                id: Date.now(),
                title: title.trim(),
                description,
                deadline,
                status: "active",
                xp: 0,
                streak: 0,
                };

                onAddGoal(newGoal);

                setTitle("");
                setDescription("");
                setDeadline("");

    }

    return(
        <Paper sx={{ p: 2, mb: 4 }}>
            <form onSubmit={handleSubmit}> 
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        fullWidth
                    />

                     <TextField
                        label="Description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        fullWidth
                    />

                     <TextField
                        type='date'
                        value={deadline}
                        onChange={(e)=> setDeadline(e.target.value)}
                        fullWidth
                    />

                    <Button type='submit' variant='contained'>
                        Add Goal
                    </Button>
                </Stack>
            </form>
        </Paper>

    )
}
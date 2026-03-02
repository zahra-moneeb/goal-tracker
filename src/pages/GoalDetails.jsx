import {
List,
  ListItem,
  Box,
  Typography,
  Chip,
  LinearProgress,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { useTranslation } from "react-i18next";
// import { tokens } from "../theme";
// import { useTheme } from "@mui/material";

export default function GoalDetails({ goals, onEdit, onDelete }) {
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

  // if (!goals || goals.length === 0) return null;

  const { id } = useParams();
  const navigate = useNavigate();

  const goal = goals.find(g => g.id === Number(id));


  if (!goal) {
    return <h2>Goal not found</h2>;
  }

    return (
        <List sx={{ width: "100%" }}>
      <ListItem
        key={goal.id}
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          border: "1px solid #b8a7b3",
          py: 3,
          m: 2,
          width: "100%",
          borderRadius: 2,

        }}
      >
        {/* 🔹 Title + Category */}
        <Stack
          direction={{ xs: "column", sm: "row" }}  // موبایل: ستونی، دسکتاپ: ردیفی
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {goal.title}
          </Typography>

          <Chip
            label={goal.category}
            size="small"
            color="primary"
          />
        </Stack>

        {/* 🔹 Progress */}
        {/* <Box sx={{ my: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box> */}

        {/* 🔹 Target Info + Status */}
        <Stack
          direction={{ xs: "column", sm: "row" }}  // موبایل: زیر هم، دسکتاپ: کنار هم
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="body2" color="text.secondary">
            {goal.current}/{goal.target} days
          </Typography>

          <Chip
            label={goal.status}
            size="small"
            color={
              goal.status === "Completed"
                ? "success"
                : goal.status === "Paused"
                ? "warning"
                : "info"
            }
          />
        </Stack>

        {/* 🔹 Buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2 }}
          flexWrap="wrap" // موبایل دکمه‌ها را به خط بعدی می‌برد
        >
          <Button variant="contained" size="small">
            Mark Progress
          </Button>

          <IconButton size="small"  onClick={() => navigate(`/goals/edit/${goal.id}`)}>
            <EditIcon />
          </IconButton>

          <IconButton size="small">
            {goal.status === "Paused" ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>

          <IconButton size="small" color="error" onClick={() => onDelete(goal.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </ListItem>
    
</List>
  );
}
     
 


   
 













   
       
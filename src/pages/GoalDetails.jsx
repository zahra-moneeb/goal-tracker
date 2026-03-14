import React from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Button,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  Tooltip
} from "@mui/material";

import {
  MenuBook,
  Add,
  Edit,
  Pause,
  Check,

} from "@mui/icons-material";
import History from "../components/goals/History";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";

import { useParams, useNavigate } from "react-router-dom";

export default function GoalDetails({ goals,  onDelete , addProgress, onToggle}) {
  const { id } = useParams();
    const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  const goal = goals.find((g) => g.id === Number(id));

  if (!goal) {
    return (
      <Typography textAlign="center" mt={5}>
        {t("goalNotFound")}
      </Typography>
    );
  }

  //for Make complete button
function getDefaultAmount(goal) {
   if (goal.type === "daily") return 1
   if (goal.type === "count") return 1
   if (goal.type === "time") return goal.targetMinutes || 1
}
  const progress =
    goal.target > 0
      ? Math.min((goal.current / goal.target) * 100, 100)
      : 0;

  return (
    <Box
      p={isMobile ? 2 : 4}
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at top, #3c096c 0%, #0b0618 45%, #02010a 100%)"
            : "radial-gradient(circle at top, #f3e5f5 0%, #ede7f6 45%, #ffffff 100%)",
        borderRadius: 4,
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          p: isMobile ? 2 : 4,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 22px 50px rgba(0,0,0,0.85)"
              : "0 10px 30px rgba(15,23,42,0.12)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.05)"
          }`,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1b1033 0%, #0b0618 60%, #02010a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f5f7fb 60%, #ede7f6 100%)",
        }}
      >
        
   
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems={isMobile ? "flex-start" : "center"}
        >
          <Avatar
            sx={{
              bgcolor:
                theme.palette.mode === "dark" ? "#9d4edd" : "#5e35b1",
              width: 60,
              height: 60,
            }}
          >
            <ChecklistIcon />
          </Avatar>

          <Box flex={1}>
            <Typography variant="h5" fontWeight={700}>
              {goal.title}
            </Typography>

            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={goal.category}
                size="small"
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(157, 78, 221, 0.18)"
                      : "rgba(94, 53, 177, 0.08)",
                  color:
                    theme.palette.mode === "dark" ? "#e0c3ff" : "#4a148c",
                }}
              />
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
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 Progress Section */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={4}
        >
          <Box flex={1}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              fontWeight={700}
            >
              {progress.toFixed(0)}%
            </Typography>

            <Typography color="text.secondary">
              {goal.current} / {goal.target}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                mt: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(148, 163, 184, 0.35)"
                    : "rgba(148, 163, 184, 0.25)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, #7b5cff, #ff6f91, #ffb347)",
                },
              }}
            />
          </Box>

          <Box flex={1}>
            <Stack spacing={1}>
              <Typography>
                <strong>{t("goalType")}:</strong> {goal.type || t("countBased")}
              </Typography>
              <Typography>
                <strong>{t("target")}:</strong> {goal.target}
              </Typography>
              <Typography>
                <strong>{t("createdOn")}:</strong> {goal.startDate}
              </Typography>
              <Typography>
                <strong>{t("startedOn")}:</strong> {goal.endDate}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/*  Buttons */}
        <Stack 
          direction={isMobile ? "column" : "row"}
          spacing={2}
          mt={4}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
            startIcon={<Add sx={{ ml: 1 }} />}
            onClick={() => addProgress(goal.id)}
          >
            {t("addProgress")}
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Edit sx={{ ml: 1 }} />}
            onClick={() => navigate(`/goals/edit/${goal.id}`)}
          >
            {t("editGoal")}
          </Button>
     <Tooltip title={goal.status === "Paused" ? "Goal Paused – Cannot add progress" : "Mark Complete"}>        
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => addProgress(goal.id, getDefaultAmount(goal))}
            startIcon={<Check sx={{ ml: 1 }} />}
          >
            {t("markComplete")}
          </Button>
     </Tooltip>          
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Pause sx={{ ml: 1 }} />}
            onClick={() => onToggle(goal.id)}
          >
            {goal.status === "Paused" ? t("resume") : t("pause")}
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon sx={{ ml: 1 }} />}
            onClick={() => onDelete(goal.id, goal.title)}
          >
            {t("delete")}
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<KeyboardBackspaceIcon sx={{ ml: 1 }} />}
            onClick={() => navigate(-1)}
          >
            {t("back")}
          </Button>
        </Stack>
      </Card>

      <History history={goal.history} />
    </Box>
  );
}

// import {
// List,
//   ListItem,
//   Box,
//   Typography,
//   Chip,
//   LinearProgress,
//   Stack,
//   Button,
//   IconButton,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import PauseIcon from "@mui/icons-material/Pause";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// // import { useTranslation } from "react-i18next";
// // import { tokens } from "../theme";
// // import { useTheme } from "@mui/material";

// export default function GoalDetails({ goals, onEdit, onDelete }) {
// //   const { t } = useTranslation();
// //   const theme = useTheme();
// //   const colors = tokens(theme.palette.mode);

//   // if (!goals || goals.length === 0) return null;

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const goal = goals.find(g => g.id === Number(id));


//   if (!goal) {
//     return <h2>Goal not found</h2>;
//   }

//     return (
//         <List sx={{ width: "100%" }}>
//       <ListItem
//         key={goal.id}
//         sx={{
//           flexDirection: "column",
//           alignItems: "stretch",
//           border: "1px solid #b8a7b3",
//           py: 3,
//           m: 2,
//           width: "100%",
//           borderRadius: 2,

//         }}
//       >
//         {/* 🔹 Title + Category */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}  // موبایل: ستونی، دسکتاپ: ردیفی
//           justifyContent="space-between"
//           alignItems={{ xs: "flex-start", sm: "center" }}
//           spacing={1}
//         >
//           <Typography variant="h6" fontWeight={600}>
//             {goal.title}
//           </Typography>

//           <Chip
//             label={goal.category}
//             size="small"
//             color="primary"
//           />
//         </Stack>

//         {/* 🔹 Progress */}
//         {/* <Box sx={{ my: 2 }}>
//           <LinearProgress
//             variant="determinate"
//             value={progress}
//             sx={{ height: 8, borderRadius: 5 }}
//           />
//         </Box> */}

//         {/* 🔹 Target Info + Status */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}  // موبایل: زیر هم، دسکتاپ: کنار هم
//           justifyContent="space-between"
//           alignItems={{ xs: "flex-start", sm: "center" }}
//           spacing={1}
//         >
//           <Typography variant="body2" color="text.secondary">
//             {goal.current}/{goal.target} days
//           </Typography>

//           <Chip
//             label={goal.status}
//             size="small"
//             color={
//               goal.status === "Completed"
//                 ? "success"
//                 : goal.status === "Paused"
//                 ? "warning"
//                 : "info"
//             }
//           />
//         </Stack>

//         {/* 🔹 Buttons */}
//         <Stack
//           direction="row"
//           spacing={1}
//           sx={{ mt: 2 }}
//           flexWrap="wrap" // موبایل دکمه‌ها را به خط بعدی می‌برد
//         >
//           <Button variant="contained" size="small">
//             Mark Progress
//           </Button>

//           <IconButton size="small"  onClick={() => navigate(`/goals/edit/${goal.id}`)}>
//             <EditIcon />
//           </IconButton>

//           <IconButton size="small">
//             {goal.status === "Paused" ? <PlayArrowIcon /> : <PauseIcon />}
//           </IconButton>

//           <IconButton size="small" color="error" onClick={() => onDelete(goal.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </Stack>
//       </ListItem>
    
// </List>
//   );
// }
     
 


   
 













   
       
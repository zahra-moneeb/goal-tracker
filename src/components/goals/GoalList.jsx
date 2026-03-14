import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Stack,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  useMediaQuery,
  Paper,

} from "@mui/material";

import {
  Add,
  Search,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GoalCard from "./GoalCard";

// Helper for category colors
// const getCategoryColor = (category) => {
//   switch (category) {
//     case "React Course":
//       return "#1976d2";
//     case "Fitness":
//       return "#2e7d32";
//     case "Study":
//       return "#9c27b0";
//     default:
//       return "#9e9e9e";
//   }
// };

// Helper for status icon
// const getStatusIcon = (status) => {
//   switch (status.toLowerCase()) {
//     case "active":
//       return "🟢";
//     case "paused":
//       return "⏸";
//     case "completed":
//       return "✔";
//     default:
//       return "ℹ️";
//   }
// };

export default function GoalList({ goals, onDelete , addProgress, onToggle}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // Filter + Sort
  const filteredGoals = useMemo(() => {
    let filtered = [...goals];

    if (tab !== "all") {
      filtered = filtered.filter(
        (g) => g.status.toLowerCase() === tab
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "progress") {
      filtered.sort(
        (a, b) => b.current / b.target - a.current / a.target
      );
    }

    if (sort === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    if (sort === "category") {
        filtered.sort((a, b) =>
    (a.category || "").toLowerCase().localeCompare(
      (b.category || "").toLowerCase()
    )
  );
}

    return filtered;
  }, [goals, tab, search, sort]);

  return (
    <Box
      p={isMobile ? 1.4 : 3}
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at top, #3c096c 0%, #0b0618 45%, #02010a 100%)"
            : "radial-gradient(circle at top, #f3e5f5 0%, #ede7f6 45%, #ffffff 100%)",
        borderRadius: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: isMobile ? 1.5 : 2,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "light"
              ? "rgba(253, 251, 255, 0.96)"
              : "rgba(12, 5, 32, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 1.5 : 2}
          justifyContent="space-between"
          alignItems={isMobile ? "stretch" : "center"}
        >
          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            placeholder={t("searchGoals")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
            }}
          />

          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="flex-end"
            flexShrink={0}
          >
            <FormControl
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: 150 }}
            >
              <InputLabel>{t("sort")}</InputLabel>
              <Select
                value={sort}
                label={t("sort")}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="newest">{t("newest")}</MenuItem>
                <MenuItem value="progress">{t("progress")}</MenuItem>
                <MenuItem value="category">{t("category")}</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              startIcon={<Add />}
              onClick={() => navigate("/goals/new") }
            >
              {isMobile ? t("add") : t("addGoal")}
            </Button>
          </Stack>
        </Stack>

        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mt: 2 }}
        >
          <Tab value="all" label={t("all")} />
          <Tab value="active" label={t("active")} />
          <Tab value="completed" label={t("completed")} />
          <Tab value="paused" label={t("paused")} />
        </Tabs>
      </Paper>

      <Stack spacing={isMobile ? 1.2 : 2}>
        {filteredGoals.length === 0 ? (
          
          <Typography textAlign="center" mt={5}>
            {t("noGoals")}
          </Typography>
        ) : (

          filteredGoals.map((goal) => {
            const percent = Math.min(
              (goal.current / goal.target) * 100,
              100
            );
            return(
                 <GoalCard key={goal.id} goal={goal}  onDelete={onDelete }  addProgress={ addProgress}  onToggle={onToggle} percent={percent}/>
            );
          })  
           )}
      </Stack>      
      
      {/* <GoalCard goals={goals} filteredGoals={filteredGoals} onDelete={onDelete }  addProgress={ addProgress}  onToggle={onToggle} /> */}
   
      {/* <Stack spacing={isMobile ? 1.2 : 2}>
        {filteredGoals.length === 0 ? (
          
          <Typography textAlign="center" mt={5}>
            {t("noGoals")}
          </Typography>
        ) : (

          filteredGoals.map((goal) => {
            const percent = Math.min(
              (goal.current / goal.target) * 100,
              100
            );

            return (
              <Card
                key={goal.id}
                sx={{
                  display: "flex",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 6,
                  },
                  p: 0,
                }}
              >
               
                <Box
                  sx={{
                    width: 6,
                    backgroundColor: getCategoryColor(goal.category),
                  }}
                />

              
                <CardContent sx={{ flex: 1, p: isMobile ? 0.8 : 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={isMobile ? 0.5 : 2}
                  >
                   
                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant={isMobile ? "body2" : "h6"}
                        noWrap
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {goal.title}
                      </Typography>

                      {!isMobile && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {goal.category}
                        </Typography>
                      )}

                 
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          my: 0.8,
                          height: isMobile ? 4 : 8,
                          borderRadius: 5,
                        }}
                      />

                 
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          sx={{ fontSize: isMobile ? 10 : 12 }}
                        >
                          🔥 {goal.streak || 0} {t("day")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontSize: isMobile ? 10 : 12 }}
                        >
                          ⭐ {goal.xp || 0} {t("xp")}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Status */}
                    {/* {isMobile ? (
                      <Box sx={{ fontSize: 16 }}>{getStatusIcon(goal.status)}</Box>
                    ) : (
                      <Chip
                        label={goal.status}
                        color={
                          goal.status === "Active"
                            ? "success"
                            : goal.status === "Paused"
                            ? "warning"
                            : "primary"
                        }
                        size="medium"
                      />
                    )}

                  
                    <Stack direction="row" spacing={isMobile ? 0.5 : 1}>
                      <Button
                        startIcon = {<DetailsIcon sx={{ ml: 1 }}/>}
                       variant="outlined"
                       margin="none"
                       pading="none"
                        size={isMobile ? "small" : "medium"}
                        
                        onClick={() => navigate(`/goals/${goal.id}`)}
                        color="primary"
                      >
                        {t("viewDetails")}
                      </Button>

                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => onDelete(goal.id)}
                      >
                        <DeleteIcon  color="error" fontSize={isMobile ? "small" : "medium"} sx={{ ml: 1 }}/>
                      </IconButton>

                <Tooltip title={goal.status === "Paused" ? "Goal Paused – Cannot add progress" : "Add Progress"}>      
                      <IconButton
                          size={isMobile ? "small" : "medium"}
                          onClick={() => addProgress(goal.id)}
                          disabled={goal.status === "Completed"}
                        >
                          <AddCircleOutline fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                 </Tooltip>

                   <IconButton
                    size={isMobile ? "small" : "medium"}
                    onClick={() => onToggle(goal.id)}   
                  >
                    {goal.status === "Paused" ? <PlayArrow /> : <Pause />}
                  </IconButton>   
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>    */} 
    </Box>
  );
}


     
 


   
 













   
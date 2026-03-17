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
            ? "radial-gradient(circle at top, #3c096c 0%, #0b0811 45%, #0e0c10 100%)"
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
              ? "linear-gradient(135deg, #e9d8f9 0%, #ffffff 60%, #c6a2f6 100%)"
              : "linear-gradient(135deg, #1b1b25 0%, #1c1924 60%, #4f4a76 100%)",
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
      
    </Box>
  );
}


     
 


   
 













   
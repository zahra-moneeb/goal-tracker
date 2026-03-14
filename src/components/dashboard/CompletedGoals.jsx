import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useTranslation } from "react-i18next";

export default function CompletedGoals({ goals, onArchive }) {
  const { t } = useTranslation();

  const completedGoals = goals.filter(
    (goal) => goal.status.toLowerCase() === "completed" && !goal.archived
  );

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        {t("completedGoals")} ({completedGoals.length})
      </Typography>

      {completedGoals.length === 0 ? (
        <Typography color="text.secondary">
          {t("noCompletedGoals")}
        </Typography>
      ) : (
        <Paper sx={{ borderRadius: 3 }}>
          <List>
            {completedGoals.map((goal) => (
              <ListItem
                key={goal.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="archive"
                    onClick={() => onArchive(goal.id)}
                  >
                    <ArchiveIcon color="warning" />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>

                <ListItemText primary={goal.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
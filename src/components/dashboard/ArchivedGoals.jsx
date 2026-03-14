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
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreIcon from "@mui/icons-material/Restore";
import { useTranslation } from "react-i18next";

export default function ArchivedGoals({ goals, onRestore }) {
  const { t } = useTranslation();

  const archivedGoals = goals.filter(
    (goal) => goal.archived === true
  );

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        {t("archivedGoals")} ({archivedGoals.length})
      </Typography>

      {archivedGoals.length === 0 ? (
        <Typography color="text.secondary">
          {t("noArchivedGoals")}
        </Typography>
      ) : (
        <Paper sx={{ borderRadius: 3 }}>
          <List>
            {archivedGoals.map((goal) => (
              <ListItem
                key={goal.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="restore"
                    onClick={() => onRestore(goal.id)}
                  >
                    <RestoreIcon color="primary" />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <ArchiveIcon color="warning" />
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
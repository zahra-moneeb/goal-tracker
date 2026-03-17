import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  Tooltip,
  Divider,
  Fade
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { useTranslation } from "react-i18next";

export default function CompletedGoals({ goals, onArchive }) {
  const { t } = useTranslation();

  const completedGoals = goals.filter(
    (goal) => goal.status.toLowerCase() === "completed" && !goal.archived
  );

  return (
    <Box mt={4} mb={2}>
      <Box display="flex" alignItems="baseline" mb={2} gap={1.5}>
        <Typography variant="h6" fontWeight="700" color="text.primary">
          {t("completedGoals")}
        </Typography>
        <Typography variant="body2" fontWeight="600" color="text.secondary">
          {completedGoals.length}
        </Typography>
      </Box>

      {completedGoals.length === 0 ? (
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            borderRadius: 3, 
            borderStyle: 'dashed',
            bgcolor: 'transparent'
          }}
        >
          <Typography color="text.secondary" variant="body2">
            {t("noCompletedGoals")}
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <List disablePadding>
            {completedGoals.map((goal, index) => (
              <React.Fragment key={goal.id}>
                <Fade in timeout={400}>
                  <ListItem
                    sx={{
                      py: 1.5,
                      px: 3,
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                    secondaryAction={
                      <Tooltip title={t("archive")} arrow>
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => onArchive(goal.id)}
                          sx={{ 
                            color: 'warning.main',
                            "&:hover": { bgcolor: 'warning.lighter' } 
                          }}
                        >
                          <ArchiveOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>

                    <ListItemText 
                      primary={goal.title} 
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        color: 'text.secondary',
                        sx: { textDecoration: 'line-through' }
                      }}
                    />
                  </ListItem>
                </Fade>
                {index < completedGoals.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

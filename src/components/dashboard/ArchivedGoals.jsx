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
  Fade,
  Chip
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory2Outlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";

export default function ArchivedGoals({ goals, onUnarchive }) {
  const { t } = useTranslation();

  const archivedGoals = goals.filter((goal) => goal.archived);

  return (
    <Box mt={4} mb={2}>
      {/* Header with Archive Context */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <InventoryIcon sx={{ color: 'text.secondary' }} fontSize="small" />
          <Typography variant="h6" fontWeight="700" color="text.primary">
            {t("archivedGoals")}
          </Typography>
          <Chip 
            label={archivedGoals.length} 
            size="small" 
            variant="outlined"
            sx={{ fontWeight: 700, height: 20, fontSize: '0.7rem', color: 'text.secondary' }}
          />
        </Box>
      </Box>

      {archivedGoals.length === 0 ? (
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 4, 
            borderStyle: 'dashed',
            bgcolor: 'action.hover',
            opacity: 0.6
          }}
        >
          <HistoryIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
          <Typography color="text.disabled" variant="body2" fontWeight={500}>
            {t("noArchivedGoals")}
          </Typography>
        </Paper>
      ) : (
        <Paper 
          elevation={0} 
          variant="outlined" 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <List disablePadding>
            {archivedGoals.map((goal, index) => (
              <React.Fragment key={goal.id}>
                <Fade in timeout={300}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "grey.50",
                      },
                    }}
                    secondaryAction={
                      <Tooltip title={t("restoreGoal")} arrow placement="left">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => onUnarchive(goal.id)}
                          sx={{ 
                            color: 'primary.main',
                            bgcolor: 'primary.lighter',
                            "&:hover": { 
                              bgcolor: 'primary.main',
                              color: 'white'
                            } 
                          }}
                        >
                          <UnarchiveOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 42 }}>
                      <Box 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: 'text.disabled' 
                        }} 
                      />
                    </ListItemIcon>

                    <ListItemText 
                      primary={goal.title} 
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        color: 'text.secondary',
                      }}
                      secondary={goal.completedAt ? `${t('completedOn')} ${goal.completedAt}` : null}
                      secondaryTypographyProps={{ variant: 'caption', color: 'text.disabled' }}
                    />
                  </ListItem>
                </Fade>
                {index < archivedGoals.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

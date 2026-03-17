
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,

} from "@mui/material";

import {
  Pause,
  PlayArrow,
   AddCircleOutline ,
} from "@mui/icons-material";

import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const getCategoryColor = (category) => {
  switch (category) {
    case "React Course":
      return "#7b5cff";
    case "Fitness":
      return "#38b000";
    case "Study":
      return "#ff6f91";
    default:
      return "#9e9e9e";
  }
};

// Helper for status icon
const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "🟢";
    case "paused":
      return "⏸";
    case "completed":
      return "✔";
    default:
      return "ℹ️";
  }
};


export default function GoalCard({goal,  onDelete , addProgress, onToggle, percent}){
      const navigate = useNavigate();
      const theme = useTheme();
      const { t } = useTranslation();
    
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    
                return (
                  <Card
                    key={goal.id}
                    elevation={0}
                    sx={{
                      display: "flex",
                      borderRadius: 3,
                      overflow: "hidden",
                      position: "relative",
                      border: `1px solid ${theme.palette.divider}`,
                      background: theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #e9d8f9 0%, #ffffff 60%, #c6a2f6 100%)"
                        : "linear-gradient(135deg, #1b1b25 0%, #1c1924 60%, #4f4a76 100%)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 10px 30px rgba(23, 35, 63, 0.08)"
                          : "0 18px 40px rgba(0, 0, 0, 0.65)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 16px 40px rgba(15, 23, 42, 0.16)"
                            : "0 22px 50px rgba(0, 0, 0, 0.85)",
                        borderColor: theme.palette.primary.main,
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
    
                    <CardContent sx={{ flex: 1, p: isMobile ? 1.2 : 2.4 }}>
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
                              fontWeight: 600,
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
                              sx={{
                                color: theme.palette.text.secondary,
                                mt: 0.25,
                                fontSize: 13,
                                letterSpacing: 0.2,
                              }}
                            >
                              {goal.category}
                            </Typography>
                          )}
    
                          {/* Progress */}
                          <LinearProgress
                            variant="determinate"
                            value={percent}
                            sx={{
                              my: 1,
                              height: isMobile ? 4 : 8,
                              borderRadius: 5,
                              backgroundColor:
                                theme.palette.mode === "light"
                                  ? "rgba(125, 89, 255, 0.12)"
                                  : "rgba(157, 78, 221, 0.25)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                background:
                                  "linear-gradient(90deg, #7b5cff, #ff6f91, #ffb347)",
                              },
                            }}
                          />
    
                          {/* Streak + XP */}
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
    
                        {isMobile ? (
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
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 500,
                              px: 0.5,
                            }}
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
                            onClick={() => onDelete(goal.id, goal.title)}
                            color="inherit"
                          >
                            <DeleteIcon  color="error" fontSize={isMobile ? "small" : "medium"} sx={{ ml: 1 }}/>
                          </IconButton>
    
                    <Tooltip title={goal.status === "Paused" ? "Goal Paused – Cannot add progress" : "Add Progress"}>      
                          <IconButton
                            size={isMobile ? "small" : "medium"}
                            onClick={() => addProgress(goal.id)}
                            disabled={goal.status === "Completed"}
                            color="inherit"
                          >
                            <AddCircleOutline
                              fontSize={isMobile ? "small" : "medium"}
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#f9f5ff"
                                    : theme.palette.primary.main,
                              }}
                            />
                          </IconButton>
                     </Tooltip>
    
                       <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => onToggle(goal.id)}
                        color="inherit"
                      >
                        {goal.status === "Paused" ? (
                          <PlayArrow
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#f9f5ff"
                                  : theme.palette.primary.main,
                            }}
                          />
                        ) : (
                          <Pause
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#f9f5ff"
                                  : theme.palette.primary.main,
                            }}
                          />
                        )}
                      </IconButton>   
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                );
     

}
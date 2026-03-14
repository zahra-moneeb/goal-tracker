import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";

function History({ history }) {
  const theme = useTheme();

  if (!history || history.length === 0) {
    return (
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          border: `1px dashed ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(248, 250, 252, 0.9)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            History
          </Typography>
          <Typography color="text.secondary">
            No progress recorded yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 16px 36px rgba(0,0,0,0.8)"
            : "0 10px 24px rgba(15,23,42,0.12)",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1b1033 0%, #0b0618 60%, #02010a 100%)"
            : "linear-gradient(135deg, #fdfbff 0%, #ede7f6 60%, #ffffff 100%)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Progress History
          </Typography>

          <Chip
            size="small"
            label={`${history.length} entries`}
            sx={{
              fontSize: 11,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(157, 78, 221, 0.18)"
                  : "rgba(94, 53, 177, 0.08)",
              color:
                theme.palette.mode === "dark" ? "#e0c3ff" : "#4a148c",
            }}
          />
        </Box>

        <List disablePadding>
          {history
            .slice()
            .reverse()
            .map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 1.2,
                    px: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleOutlineIcon
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "#7bff9b"
                            : "#2e7d32",
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500 }}
                        >
                          {item.action}
                        </Typography>

                        {item.xp ? (
                          <Chip
                            size="small"
                            icon={<StarIcon sx={{ fontSize: 16 }} />}
                            label={`+${item.xp} XP`}
                            color="primary"
                            sx={{ height: 22 }}
                          />
                        ) : null}

                        {item.streak ? (
                          <Chip
                            size="small"
                            icon={<WhatshotIcon sx={{ fontSize: 16 }} />}
                            label={`${item.streak}🔥`}
                            color="secondary"
                            sx={{ height: 22 }}
                          />
                        ) : null}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {new Date(item.date).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>

                {index !== history.length - 1 && (
                  <Divider
                    sx={{
                      opacity: 0.4,
                    }}
                  />
                )}
              </motion.div>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default History;
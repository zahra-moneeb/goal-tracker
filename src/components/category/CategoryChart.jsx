import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getCategoryStats } from "../../utils/categoryStats";
import { Box, Typography } from "@mui/material";

export default function CategoryChart({ goals }) {
  const data = getCategoryStats(goals);

  return (
    <Box>
      <Typography variant="h6" mb={3}>Category Progress</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="active" fill="#1976d2" />
          <Bar dataKey="completed" fill="#2e7d32" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
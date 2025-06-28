import { MoreHoriz } from "@mui/icons-material";
import { Card, Box, Typography } from "@mui/material";

export default function ProjectSummary({ color, count, label }) {
  return (
    <Box
      sx={{ backgroundColor: color }}
      className="shadow-md rounded-2xl p-4 h-44 mb-4"
    >
      <div className="flex justify-between">
        <div className="text-3xl font-bold">{count}</div>
        <div className=" hover:border-transparent rounded-2xl text-white cursor-pointer hover:text-black">
          <MoreHoriz />
        </div>
      </div>
      <div >{label}</div>
    </Box>
  );
}

import { Visibility } from "@mui/icons-material";
import { Card, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProjectSummary({
  color,
  count,
  label,
  icon,
  percentage,
  filter,
}) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}dd, ${color}aa)`,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
      className="shadow-lg rounded-2xl p-6 h-44 mb-4 text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">{icon}</div>
          <div>
            <Typography variant="h3" className="font-bold text-white">
              {count}
            </Typography>
            <Typography variant="caption" className="text-white/80">
              {percentage && `${percentage}%`}
            </Typography>
          </div>
        </div>
        <IconButton
          size="small"
          className="text-white/80 hover:text-white hover:bg-white/20"
          onClick={() =>
            navigate("/tasks", {
              state: { filter: filter.toLowerCase() }, // or pass a fixed value like "completed"
            })
          }
        >
          <Visibility />
        </IconButton>
      </div>

      <Typography variant="body1" className="text-white/90 font-medium">
        {label}
      </Typography>

      {/* Progress indicator */}
      {percentage && (
        <div className="mt-3">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </Card>
  );
}

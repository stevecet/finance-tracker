import { useSearch } from "./SearchContext";
import { tasks } from "../data/tasks";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";

export default function SearchResultBanner() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      task.status.toLowerCase().includes(term)
    );
  });

  if (!searchTerm || filteredTasks.length === 0 || !visible) return null;

  const handleNavigate = () => {
    navigate("/tasks");
  };
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent navigating when clicking close
    setVisible(false);
    setSearchTerm("");
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md mt-2 text-sm flex justify-between items-center"
    >
      <span>
        {filteredTasks.length} result
        {filteredTasks.length > 1 ? "s" : ""} for "<strong>{searchTerm}</strong>
        " – click to view
      </span>
      <IconButton onClick={handleClose} size="small">
        <Close fontSize="small" sx={{ color: "red" }} />
      </IconButton>
    </div>
  );
}

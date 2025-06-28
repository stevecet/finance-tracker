import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

export default function SideNav() {
  return (
    <div class="fixed shadow-2xl h-fit rounded-full top-46 left-3 bottom-0 flex-col bg-white border-black hidden md:flex">
      <div class="flex-1 py-4">
        <nav class="flex relative text-black py-3 mx-2 rounded-full flex-col gap-4">
          <IconButton className="p-2 rounded-full cursor-pointer">
            <DashboardIcon />
          </IconButton>
          <IconButton className="p-2 rounded-full cursor-pointer">
            <TaskAltIcon />
          </IconButton>
          <IconButton className="p-2 rounded-full cursor-pointer">
            <BarChartIcon />
          </IconButton>
          <IconButton className="p-2 rounded-full cursor-pointer">
            <AccountCircleIcon />
          </IconButton>
        </nav>
      </div>
    </div>
  );
}

import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/project-dashboard",
  },
  {
    title: "Tasks",
    icon: <TaskAltIcon />,
    link: "/tasks",
  },
  {
    title: "Statistics",
    icon: <BarChartIcon />,
    link: "/statistics",
  },
  {
    title: "Account",
    icon: <AccountCircleIcon />,
    link: "/account",
  },
];

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (item) => {
    if (item.link && location.pathname === item.link) return true;
    if (item.children) return item.children.some((child) => isActive(child));
    return false;
  };
  const handleTextClick = (link) => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <div className="fixed shadow-2xl h-fit rounded-full top-46 left-3 bottom-0 flex-col bg-white border-black hidden sm:flex">
      <div className="flex-1 py-4">
        <nav className="flex relative text-black py-3 mx-2 rounded-full flex-col gap-4">
          {items.map((item) => {
            const active = isActive(item);
            return (
              <Tooltip title={item.title} placement="right">
                <IconButton
                  className="p-2 rounded-full cursor-pointer shadow-md"
                  onClick={() => handleTextClick(item.link)}
                  sx={{
                    bgcolor: active ? "#3C74D9" : "transparent",
                    color: active ? "#EFF6FF" : "black",
                    "&:hover": {
                      bgcolor: "#65CCCD",
                      color: active ? "white" : "#EFF6FF",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

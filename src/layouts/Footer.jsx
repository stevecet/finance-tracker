import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Close, Menu } from "@mui/icons-material";

const items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
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
const DRAWER_WIDTH = 230;

export default function Footer() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <Container maxWidth="lg">
      <div className=" sm:ml-16 my-4 xl:mx-0 flex justify-between items-center sm:flex-row flex-col-reverse gap-2">
        <div className="rounded-full px-5 py-2 bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-300 font-light text-sm">
          © Copyright{" "}
          <a
            href="https://github.com/stevecet/"
            className="text-blue-400 hover:underline"
          >
            steveceto
          </a>{" "}
          | all rights reserved
        </div>
        <div className="rounded-full px-5 pb-0.5 bg-white dark:bg-gray-800 shadow-md text-gray-400 dark:text-gray-300 font-light">
          <IconButton size="small">
            <a href="https://wa.me/237659461748" target="blank">
              <WhatsAppIcon className="hover:text-green-500" />
            </a>
          </IconButton>
          <IconButton size="small">
            <a
              href="https://www.linkedin.com/in/gilchrist-steve-aurel-veceto-6a4216202/"
              target="blank"
            >
              <LinkedInIcon className="hover:text-blue-700" />
            </a>
          </IconButton>
          <IconButton size="small">
            <a href="https://github.com/stevecet/" target="blank">
              <GitHubIcon className="hover:text-white" />
            </a>
          </IconButton>
        </div>
      </div>

      <div className="flex justify-between items-center sm:hidden">
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: "absolute", top: 28, left: 16, zIndex: 1300 }}
        >
          <Menu sx={{ fontSize: 30 }} />
        </IconButton>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            zIndex: 1300,
            width: isMobile ? "auto" : DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ position: "absolute", top: 16, right: 16, zIndex: 1500 }}
            >
              <Close />
            </IconButton>
          )}
          <Box sx={{ height: 64 }} />
          <List>
            {items.map((item) => {
              const active = isActive(item);
              return (
                <div
                  key={item.title}
                  className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    active ? "bg-gray-300 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => handleTextClick(item.link)}
                >
                  <IconButton className="rounded-full text-black dark:text-white">
                    {item.icon}
                  </IconButton>
                  <div className="text-black dark:text-white">{item.title}</div>
                </div>
              );
            })}
          </List>
        </Drawer>
      </div>
    </Container>
  );
}

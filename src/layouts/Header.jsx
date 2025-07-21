import { Nightlight, Notifications, Sunny } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Container, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../components/SearchContext";

export default function Header({ darkMode, setDarkMode}) {
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();

  return (
    <Container maxWidth="xl">
      <div className="flex justify-between items-center ml-10 sm:ml-0 px-4 py-8 text-gray-800 dark:text-white">
        <div className="cursor-pointer">
          <img className="w-40" src="/logo.png" onClick={() => navigate("/")} />
        </div>
        <div className="flex justify-around items-center gap-2">
          <div className="hidden sm:flex items-center shadow-sm rounded-full p-2 bg-gray-100 dark:bg-gray-700 w-64 transition-colors duration-300">
            <SearchIcon className="ml-2 text-blue-400" />
            <input
              type="text"
              placeholder="Search task..."
              className="ml-2 text-black dark:text-white text-sm bg-transparent outline-none w-full placeholder:text-gray-500 dark:placeholder:text-gray-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <IconButton
              className="p-2 shadow-sm rounded-full cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sunny /> : <Nightlight />}
            </IconButton>
            <IconButton className="p-2 shadow-sm rounded-full cursor-pointer">
              <Notifications />
            </IconButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

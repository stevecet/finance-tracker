import { Nightlight, Notifications, Sunny } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Container, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [clicked, isClicked] = useState(true);
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <div className=" flex justify-between items-center ml-10 sm:ml-0 px-4 py-8 text-gray-800">
        <div className="cursor-pointer">
          <img className="w-40" src="/logo.png" onClick={() => navigate("/")} />
        </div>
        <div className="flex justify-around m items-center  gap-2">
          <div className="hidden sm:flex items-center shadow-sm rounded-full p-2 bg-white w-64">
            <SearchIcon className="ml-2 text-blue-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="ml-2 text-black text-sm bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex gap-3">
            {clicked ? (
              <IconButton
                className="p-2 shadow-sm rounded-full cursor-pointer"
                onClick={() => isClicked(false)}
              >
                <Sunny />
              </IconButton>
            ) : (
              <IconButton
                className="p-2 shadow-sm rounded-full cursor-pointer"
                onClick={() => isClicked(true)}
              >
                <Nightlight />
              </IconButton>
            )}
            <IconButton className="p-2 shadow-sm rounded-full cursor-pointer">
              <Notifications />
            </IconButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

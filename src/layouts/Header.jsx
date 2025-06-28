import { Nightlight, Notifications, Sunny } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Container, IconButton } from "@mui/material";
import { useState } from "react";
export default function Header() {
  const [clicked, isClicked] = useState(true);
  console.log(clicked);
  return (
    <Container maxWidth="xl">
      <div className="grid grid-cols-2 items-center px-4 py-8 text-gray-800">
        <div>
          <img className="w-40" src="/logo.png" />
        </div>
        <div className="flex justify-around items-center">
          <div className="flex items-center shadow-sm rounded-full p-2  bg-white">
            <SearchIcon className="ml-3 text-blue-200" />
            <input
              type="text"
              placeholder="Search here..."
              className="ml-3 text-black text-sm w-md"
            />
          </div>

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
    </Container>
  );
}

import { Nightlight, Notifications, Sunny } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Container, IconButton } from "@mui/material";
import { useState } from "react";
export default function Header() {
  const [clicked, isClicked] = useState(true);
  return (
    <Container maxWidth="xl">
      <div className=" flex justify-between items-center ml-10 sm:ml-0 px-4 py-8 text-gray-800">
        <div className="">
          <img className="w-40" src="/logo.png" />
        </div>
        <div className="flex justify-around m items-center  gap-2">
          <div className="sm:flex items-center shadow-sm rounded-full p-2 hidden bg-white">
            <SearchIcon className="ml-3 text-blue-200" />
            <input
              type="text"
              placeholder="Search here..."
              className="ml-3 text-black text-sm w-full"
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

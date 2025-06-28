import { Nightlight, Notifications, Sunny } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
export default function Header() {
  return (
    <div className="flex justify-around items-center p-4 text-gray-800">
      <div className="bg-red-400">Task Manager</div>
      <div className="flex justify-around bg-red-400 items-center">
        <div className="flex items-center shadow-sm rounded-full p-2 bg-white">
          <SearchIcon className="text-blue-200" />
          <input
            type="text"
            placeholder="Search here..."
            className="border-none outline-none ml-3 text-black font-extralight"
          />
        </div>
        <Notifications />
        <Sunny />
        {/* <Nightlight /> */}
      </div>
    </div>
  );
}

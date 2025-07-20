// import { useState } from "react";

// export default function TaskFilters({buttons, count}) {
//   const [selectedButton, setSelectedButton] = useState(null); // State to hold the ID or value of the selected button

//   const handleButtonClick = (buttonId) => {
//     setSelectedButton(buttonId);
//   };

//   return (
//     <div className="flex gap-3 overflow-x-auto pb-2 text-black">
//       {buttons.map((button) => (
//         <button
//           key={button.id}
//           onClick={() => handleButtonClick(button.id)}
//           className={`
//             px-4 py-2 rounded-3xl transition-colors duration-200 cursor-pointer
//             ${selectedButton === button.id
//               ? 'bg-black text-blue-50' // Selected state: background black, text blue
//               : 'border border-black text-black bg-inherit' // Not selected state: border black, text black, background inherit
//             }
//           `}
//         >
//           {button.label} {count}
//         </button>
//       ))}
//     </div>
//   );
// };

import { useCallback } from "react";

export default function TaskFilters({
  buttons, 
  counts, 
  activeFilter, 
  onChange, 
}) {
  const handleClick = useCallback(
    (buttonId) => {
      if (buttonId !== activeFilter) {
        onChange(buttonId);
      }
    },
    [activeFilter, onChange]
  );

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible pb-2 text-black">
      {buttons.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl transition-colors duration-200 cursor-pointer
        text-xs sm:text-sm whitespace-nowrap
        ${
          activeFilter === id
            ? "bg-black text-blue-50"
            : "border border-black text-black bg-transparent"
        }
      `}
        >
          {label} {counts[id] ?? 0}
        </button>
      ))}
    </div>
  );
}

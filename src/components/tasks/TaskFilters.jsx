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
    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible pb-2 text-black dark:text-white">
      {buttons.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl transition-colors duration-200 cursor-pointer
        text-xs sm:text-sm whitespace-nowrap
        ${
          activeFilter === id
            ? "bg-black text-blue-50 dark:bg-blue-50 dark:text-black"
            : "border border-black text-black bg-transparent dark:border-blue-50 dark:text-blue-50"
        }
      `}
        >
          {label} {counts[id] ?? 0}
        </button>
      ))}
    </div>
  );
}

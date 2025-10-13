"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggleButton() {
  const { state, dispatch } = useTheme();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className="cursor-pointer px-4 py-2 rounded-full shadow-sm border border-gray-300 hover:bg-gray-100 hover:text-black transition "
    >
      Switch to {state.theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

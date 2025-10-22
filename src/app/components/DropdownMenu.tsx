"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState, useRef, useEffect } from "react";

interface DropdownMenuProps {
  label: React.ReactNode;
  items: { label: string; onClick: () => void; disabled: boolean }[];
  disabled?: boolean;
}

export default function DropdownMenu({
  label,
  items,
  disabled,
}: DropdownMenuProps) {
  const { state } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        className={`px-4 py-2 rounded-full shadow-sm transition 
          ${
            disabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200 hover:text-black"
          }`}
      >
        {label}
      </button>

      {isOpen && !disabled && (
        <div
          className="absolute right-0 mt-2 w-40 shadow-lg rounded-lg border z-50"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            borderColor: state.theme === "dark" ? "#374151" : "#e5e7eb",
          }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              disabled={item.disabled}
              className={
                "block w-full text-left px-4 py-2 text-sm rounded-md transition"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

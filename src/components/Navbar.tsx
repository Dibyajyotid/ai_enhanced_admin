"use client";
import {
  Sun,
  Moon,
  Ellipsis,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onRightPanelToggle: () => void;
  isRightPanelOpen: boolean;
}

export function Navbar({ onRightPanelToggle, isRightPanelOpen }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  //   const openRightPanel = () => {
  //     const
  //   }

  return (
    <div className="w-full border-b border-border bg-background">
      <div className="flex justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="text-lg font-medium text-foreground">Your inbox</div>
        </div>

        {/* User Profile middle*/}
        <div>
          <span className="text-sm font-medium text-foreground">
            Luis Easton
          </span>
        </div>

        {/* Right side - Actions*/}
        <div className="flex items-center gap-4">
          <button
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Toggle dark mode"
          >
            <Ellipsis size={20} />
          </button>

          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleTheme}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={onRightPanelToggle}
            className="
              bg-black dark:bg-primary  
              text-white                 
              hover:bg-gray-800   
              transition-colors 
              duration-200
              flex 
              items-center 
              text-center 
              align-middle 
              justify-center 
              gap-1 
              rounded-md
              px-3 py-1"
            aria-label="Toggle panel"
          >
            {isRightPanelOpen ? (
              <PanelRightClose size={20} />
            ) : (
              <PanelRightOpen size={20} />
            )}
            {isRightPanelOpen ? (
              <span className="font-bold">Close</span>
            ) : (
              <span className="font-bold">Open</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

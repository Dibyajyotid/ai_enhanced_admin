"use client";
import { useState } from "react";
import { AIChatLayout } from "./layout/AIChatLayout";
import { DetailsPanel } from "./layout/DetailsPanel";

export function RightPanel({ isOpen }: { isOpen: boolean }) {
  const [activeTab, setActiveTab] = useState<"chat" | "details">("chat");

  return (
    <div
      className={`
        fixed top-0 right-0 h-screen w-[30vw] bg-background 
        border-l border-border shadow-lg z-50 flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 text-center py-2 transition-colors relative ${
            activeTab === "chat"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          AI Assistant
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 text-center py-2 transition-colors relative ${
            activeTab === "details"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Details
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" ? <AIChatLayout /> : <DetailsPanel />}
      </div>
    </div>
  );
}

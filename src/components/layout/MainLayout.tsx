"use client";

import { useState } from "react";
import { Navbar } from "../Navbar";
import { RightPanel } from "../RightPanel";
import { Inbox } from "../Inbox";
import { ChatLayout } from "./ChatLayout";

export function MainLayout() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`${
          isRightPanelOpen ? "w-[70vw]" : "w-full"
        } h-screen bg-background text-foreground transition-all duration-300 ease-in-out`}
      >
        <Navbar
          onRightPanelToggle={() => setIsRightPanelOpen(!isRightPanelOpen)}
          isRightPanelOpen={isRightPanelOpen}
        />
        <div>
          <ChatLayout />
        </div>
      </div>
      <RightPanel isOpen={isRightPanelOpen} />
    </div>
  );
}

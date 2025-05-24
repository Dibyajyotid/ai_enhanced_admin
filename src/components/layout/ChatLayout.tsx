'use client'
import { Chat } from "../Chat";
import { InboxChatLayout } from "./InboxChatLayout";

export function ChatLayout() {
  return (
    <div className="h-100vh w-[70vw]">
      <InboxChatLayout />
    </div>
  );
}

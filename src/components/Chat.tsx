import { InboxItem } from "../lib/types";
import { MessageInput } from "./MessageInput";

interface ChatProps {
  selectedChat?: InboxItem;
}

export function Chat({ selectedChat }: ChatProps) {
  return (
    <div className="h-screen w-[70vw] grid grid-rows-[minmax(0,1fr)_auto] bg-white">
      {selectedChat ? (
        <>
          {/* Scrollable messages area */}
          <div className="overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === "You"
                    ? "ml-auto bg-blue-200 text-black"
                    : "bg-gray-200"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 text-right">{message.time}</p>
              </div>
            ))}
          </div>
          <MessageInput />
        </>
      ) : (
        <div className="row-span-2 flex items-center justify-center">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}

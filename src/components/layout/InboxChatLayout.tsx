import { useState } from "react";
import { InboxItem } from "../../lib/types";
import { Inbox } from "../Inbox";
import { Chat } from "../Chat";

export function InboxChatLayout() {
  // Sample data with messages
  const inboxItems: InboxItem[] = [
    {
      id: 1,
      sender: "Luis - Github",
      subject: "",
      preview: "Hey! I have a question...",
      time: "10:30 AM",
      messages: [
        {
          text: "I bought a product from your store in November as a christmas gift for a memeber of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-openned.",
          sender: "Luis",
          time: "1min",
        },
        {
          text: "Let me just look into this for you, Luis.",
          sender: "You",
          time: "seen - 1min",
        },
      ],
    },
    {
      id: 2,
      sender: "Ivan - Nike",
      subject: "",
      preview: "Hi there, I have a que...",
      time: "30min",
      messages: [
        {
          text: "Hi there, I have a question about the product i ordered",
          sender: "Ivan - Nike",
          time: "30min",
        },
      ],
    },
    {
      id: 3,
      sender: "Lead from New York",
      subject: "",
      preview: "Good morning, let me...",
      time: "40min",
      messages: [
        {
          text: "Good morning, let me give an update about the product i ordered yesterday",
          sender: "Lead from New York",
          time: "40min",
        },
      ],
    },
    {
      id: 4,
      sender: "Booking API problems",
      subject: "Bug report",
      preview: "Luis - Small Crafts",
      time: "45min",
      messages: [
        {
          text: "The bug report is provided",
          sender: "Luis - Small Crafts",
          time: "45min",
        },
      ],
    },
    {
      id: 5,
      sender: "Miracle - Exemplary Bank",
      subject: "",
      preview: "Hi there, I am here to...",
      time: "45min",
      messages: [
        {
          text: "Hi there, I am here to give you an update about your recent payment status",
          sender: "Lead from New York",
          time: "45min",
        },
      ],
    },
  ];

  const [selectedChat, setSelectedChat] = useState<InboxItem | null>(null);

  return (
    <div className="flex">
      <Inbox
        items={inboxItems}
        onSelect={setSelectedChat}
        selectedId={selectedChat?.id}
      />
      <Chat selectedChat={selectedChat || undefined} />
    </div>
  );
}

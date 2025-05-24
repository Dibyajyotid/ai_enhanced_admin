"use client";
import { ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function AIChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setHasInteracted(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#f5f6fa] to-[#eceef5]">
      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-6 space-y-4 relative z-10">
        {!hasInteracted ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-2">
            <div className="text-2xl font-semibold">
              Hi, I&apos;m Fin AI Copilot
            </div>
            <p className="text-gray-500 text-sm">
              Ask me anything about this conversation.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-blue-200 text-black shadow-md"
                    : "mr-auto bg-white/70 backdrop-blur-md text-gray-800 shadow"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto max-w-[80%] p-4 rounded-2xl bg-white/80 backdrop-blur text-sm shadow">
                <div className="flex gap-2">
                  {[0, 100, 200].map((d) => (
                    <div
                      key={d}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-10">
        <div className="relative">
          {/* Horizontal blurry gradient layer */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-800  to-amber-500 opacity-50 blur-2xl pointer-events-none" />

          {/* Vertical white gradient over it */}
          <div className="relative bg-gradient-to-t from-white/90 via-white/50 to-transparent px-4 pt-2 pb-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 pr-12 rounded-xl focus:outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

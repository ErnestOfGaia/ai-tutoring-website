"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
};

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Hello! I'm the Ernest Of Gaia routing agent. Are you interested in AI coaching, scheduling a session, or something else?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpen);

    // Initial check for ?chat=open
    if (typeof window !== "undefined" && window.location.search.includes("chat=open")) {
      setIsOpen(true);
      // Clean up the URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete("chat");
      window.history.replaceState(null, "", url.toString());
    }

    return () => window.removeEventListener("open-chat", handleOpen);
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Build history from prior turns (skip index 0 — hardcoded greeting, not from Mastra)
      const history = [
        ...messages.slice(1).map((m) => ({
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content: text },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const data = await res.json();
      const agentMsg = data.reply || "I'm sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { role: "agent", content: agentMsg }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content:
            "Sorry, I had trouble thinking of a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`chat-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`chat-overlay ${isOpen ? "open" : ""}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chat W/ Agents</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white opacity-70 hover:opacity-100 transition-opacity p-2 -mr-2"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-container h-full">
          <div className="message-list flex-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.role === "user" ? "message--user" : "message--agent"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="message message--agent">
                <span className="opacity-70 animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row mt-4">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="send-btn"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

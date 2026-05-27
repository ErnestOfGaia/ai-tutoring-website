"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
};

// Quick-reply chips: when the last agent message ends with a recognized
// prompt pattern, render structured pill buttons. Click sends the chip's
// `send` text as if the visitor had typed it. Frontend-only — backend sees
// a normal text message either way. This eliminates the recap-confirm loop
// class of bugs (a clicked "yes" survives no LLM paraphrasing) and lowers
// mobile friction (no keyboard typing required for the common case).
type ChipSet = { id: string; label: string; send: string }[];

const CHIP_PATTERNS: { match: RegExp; chips: ChipSet }[] = [
  // Secretary booking recap. The prompt explicitly ends recap with this
  // phrase, so the regex anchors to end-of-message.
  {
    match: /shall I book it\?\s*$/i,
    chips: [
      { id: "yes",    label: "✓ Yes, book it", send: "yes, book it" },
      { id: "change", label: "Change time",    send: "actually, let's change the time" },
      { id: "no",     label: "Not yet",        send: "not yet, hold on" },
    ],
  },
];

function detectChips(message: string): ChipSet | null {
  for (const { match, chips } of CHIP_PATTERNS) {
    if (match.test(message.trim())) return chips;
  }
  return null;
}

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
  // Ref kept in sync with the current `sendText` closure so the open-chat
  // event handler (registered once on mount) always calls the freshest
  // version — capturing it directly would read stale `messages` state.
  const sendTextRef = useRef<(t: string) => Promise<void>>(async () => {});

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Open-chat event optionally carries `detail.initialMessage` — when
    // present, auto-send it after the overlay opens. Used by the
    // "Book Appointment" button to land the visitor on the secretary agent
    // without forcing them to type their intent.
    const handleOpen = (e: Event) => {
      setIsOpen(true);
      const initial = (e as CustomEvent<{ initialMessage?: string }>).detail
        ?.initialMessage;
      if (initial) {
        // Defer one tick so the overlay's open transition kicks off first.
        setTimeout(() => { void sendTextRef.current(initial); }, 50);
      }
    };
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

  const sendText = async (text: string) => {
    if (!text.trim() || loading) return;

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

  // Re-bind the ref every render so handleOpen sees the latest closure
  // (which captures the current `messages` / `loading` state).
  sendTextRef.current = sendText;

  const sendMessage = () => sendText(input.trim());
  const sendChip   = (text: string) => sendText(text);

  // Chips render only against the latest agent message, and only when not
  // currently loading (otherwise the recap is stale by the time the user
  // clicks).
  const lastAgentMessage = [...messages].reverse().find((m) => m.role === "agent");
  const activeChips =
    !loading && lastAgentMessage ? detectChips(lastAgentMessage.content) : null;

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

          {activeChips && (
            <div className="chat-chips" role="group" aria-label="Quick reply options">
              {activeChips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chat-chip"
                  onClick={() => sendChip(c.send)}
                  disabled={loading}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
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

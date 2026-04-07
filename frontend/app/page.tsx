"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "agent"; text: string };

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = () => {
    setIsChatOpen(true);
    window.history.pushState(null, "", "/chat");
  };

  const closeChat = () => {
    setIsChatOpen(false);
    window.history.pushState(null, "", "/");
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "agent", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header className="top-bar">
        <a href="tel:+15036640546">503-664-0546</a>
        <a href="mailto:eog@ErnestOfGaia.xyz">eog@ErnestOfGaia.xyz</a>
        <a
          href="https://linkedin.com/in/ernestofgaia"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/ErnestOfGaia"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ErnestOfGaia
        </a>
      </header>

      {/* ── Hero ── */}
      <main className="hero">
        <div className="hero-card">
          {!isChatOpen ? (
            <div key="info" className="card-content">
              <p className="eyebrow">Your local guide to AI tools</p>

              <h1>Ernest Of Gaia</h1>

              <p className="hero-body">
                Master the art of prompt engineering and lifecycle automation
                through personalized, 1-on-1 holistic coaching.
              </p>

              <p className="tagline">AI, Explained Like a Human</p>

              <div className="location-pill">Pacific City → Portland, Oregon</div>

              <div className="services">
                <div className="service-card">1-on-1 Coaching</div>
                <div className="service-card">Custom Plans</div>
                <div className="service-card">On-Site Visits</div>
              </div>

              <button type="button" className="cta-btn" onClick={openChat}>
                Chat with me
              </button>
            </div>
          ) : (
            <div key="chat" className="card-content chat-container">
              <button type="button" className="back-btn" onClick={closeChat}>
                ← Back
              </button>

              <div className="message-list">
                {messages.map((m, i) => (
                  <div key={i} className={`message message--${m.role}`}>
                    {m.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-row">
                <input
                  type="text"
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message…"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={loading}
                >
                  {loading ? "…" : "Send"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

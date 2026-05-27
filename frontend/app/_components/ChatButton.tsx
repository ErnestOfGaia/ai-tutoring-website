"use client";

interface ChatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /**
   * Optional message to auto-send the moment the chat opens. Used to deep-link
   * the visitor into a specific agent's flow — e.g. "Book Appointment" sends
   * a booking-intent string so the router lands them on the secretary.
   */
  initialMessage?: string;
}

export default function ChatButton({
  children,
  onClick,
  initialMessage,
  ...props
}: ChatButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fire the global custom event; ChatOverlay listens for it.
    window.dispatchEvent(
      new CustomEvent("open-chat", { detail: { initialMessage } }),
    );
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children || "Ask Questions"}
    </button>
  );
}

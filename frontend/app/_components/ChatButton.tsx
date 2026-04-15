"use client";

interface ChatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function ChatButton({ children, onClick, ...props }: ChatButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fire the global custom event
    window.dispatchEvent(new CustomEvent("open-chat"));
    // Call the original onClick if one exists
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children || "Chat W/ Agents"}
    </button>
  );
}

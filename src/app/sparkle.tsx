import type { CSSProperties } from "react";

export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="8 8 48 48" fill="none" aria-hidden="true" className={className} style={style}>
      <path
        fill="currentColor"
        d="M32.6 9.5c.9 0 1.2 1.6 1.4 4 .7 8.6 2.4 13.6 6.2 15.6 3.2 1.7 8.4 2.2 14 2.6 1.5.1 1.5 1.5 0 1.7-5.6.6-10.8 1-14 2.6-3.8 2-5.5 7-6.2 15.8-.2 2.4-.6 3.9-1.4 3.9s-1.2-1.5-1.4-3.9c-.7-8.8-2.4-13.8-6.2-15.8-3.2-1.6-8.2-2-13.4-2.6-1.5-.2-1.5-1.6 0-1.7 5.2-.4 10.2-.9 13.4-2.6 3.8-2 5.5-7 6.2-15.6.2-2.4.5-4 1.4-4z"
      />
    </svg>
  );
}

"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * A mailto link that also copies the address, so it still does something
 * for visitors whose browser has no mail app set up. While the address is
 * freshly copied the link carries `data-copied`, which children can style on.
 */
export function EmailLink({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      data-copied={copied ? "" : undefined}
      onClick={() => {
        navigator.clipboard?.writeText(email).then(
          () => setCopied(true),
          () => {},
        );
      }}
    >
      {children}
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </a>
  );
}

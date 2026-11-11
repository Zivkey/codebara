"use client";

import { useState } from "react";
import { Sparkle } from "./sparkle";
import { THEMES } from "./theme-config";
import { setTheme, useTheme } from "./use-theme";

/**
 * One sparkle button: each click spins it and moves on to the next theme.
 * It has a solid fill because it floats over the page as it scrolls.
 */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const active = useTheme();
  const [spins, setSpins] = useState(0);

  const index = THEMES.findIndex((theme) => theme.id === active);
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  return (
    <button
      type="button"
      aria-label={`Change color theme. Now ${current.label}, next ${next.label}.`}
      onClick={() => {
        setTheme(next.id);
        setSpins((count) => count + 1);
      }}
      className={`flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-ink bg-page outline-none transition-[background-color,border-color,scale] duration-300 hover:bg-[color-mix(in_srgb,var(--ink)_14%,var(--page))] focus-visible:bg-[color-mix(in_srgb,var(--ink)_14%,var(--page))] active:scale-90 ${className}`}
    >
      {/* The sparkle looks the same every quarter turn, so half a turn per click reads as one spin. */}
      <Sparkle
        className="size-[22px] transition-[rotate] duration-700 ease-out-expo motion-reduce:transition-none"
        style={{ rotate: `${spins * 180}deg` }}
      />
    </button>
  );
}

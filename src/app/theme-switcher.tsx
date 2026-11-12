"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkle } from "./sparkle";
import { THEMES } from "./theme-config";
import { setTheme, useTheme } from "./use-theme";

/**
 * "CLICK ME" in Geist Bold 11px, set on a 27px-radius arc over the top of the
 * button and converted to outlines so it draws the same in every browser.
 * The origin of the viewBox is the centre of the button.
 */
const CLICK_ME_ARC =
  "M-20.24 -17.6L-20.24 -17.6Q-20.94 -16.8 -21.85 -16.48Q-22.76 -16.17 -23.75 -16.42Q-24.75 -16.66 -25.71 -17.49L-25.71 -17.49Q-26.65 -18.31 -27.05 -19.25Q-27.45 -20.19 -27.29 -21.15Q-27.13 -22.12 -26.39 -22.97L-26.39 -22.97Q-25.39 -24.12 -24.27 -24.27Q-23.14 -24.43 -21.92 -23.7L-21.92 -23.7L-23.01 -22.34Q-23.65 -22.72 -24.25 -22.66Q-24.85 -22.59 -25.33 -22.04L-25.33 -22.04Q-25.74 -21.57 -25.78 -21.02Q-25.81 -20.47 -25.51 -19.9Q-25.2 -19.33 -24.58 -18.8L-24.58 -18.8Q-23.96 -18.26 -23.35 -18.05Q-22.74 -17.83 -22.21 -17.96Q-21.69 -18.08 -21.29 -18.54L-21.29 -18.54Q-20.77 -19.14 -20.83 -19.76Q-20.88 -20.38 -21.41 -20.98L-21.41 -20.98L-20.21 -22.26Q-19.59 -21.52 -19.38 -20.74Q-19.16 -19.96 -19.37 -19.17Q-19.57 -18.38 -20.24 -17.6M-12.39 -24.16L-16.8 -21.27L-21.08 -27.81L-19.68 -28.73L-15.65 -22.57L-16.95 -22.86L-13.16 -25.33L-12.39 -24.16M-9.71 -25.21L-11.25 -24.56L-14.28 -31.76L-12.74 -32.4L-9.71 -25.21M-4.78 -26.4L-4.78 -26.4Q-5.83 -26.2 -6.73 -26.53Q-7.64 -26.85 -8.26 -27.67Q-8.89 -28.48 -9.12 -29.73L-9.12 -29.73Q-9.34 -30.96 -9.07 -31.94Q-8.79 -32.93 -8.06 -33.58Q-7.33 -34.22 -6.22 -34.43L-6.22 -34.43Q-4.72 -34.71 -3.75 -34.12Q-2.77 -33.53 -2.28 -32.2L-2.28 -32.2L-3.98 -31.82Q-4.24 -32.52 -4.75 -32.85Q-5.25 -33.18 -5.97 -33.04L-5.97 -33.04Q-6.59 -32.93 -6.96 -32.53Q-7.33 -32.12 -7.45 -31.48Q-7.57 -30.85 -7.42 -30.05L-7.42 -30.05Q-7.27 -29.24 -6.93 -28.69Q-6.59 -28.14 -6.1 -27.91Q-5.61 -27.67 -5.01 -27.78L-5.01 -27.78Q-4.23 -27.93 -3.89 -28.44Q-3.54 -28.96 -3.57 -29.76L-3.57 -29.76L-1.84 -30.01Q-1.82 -29.04 -2.14 -28.3Q-2.46 -27.56 -3.12 -27.07Q-3.77 -26.58 -4.78 -26.4M1.87 -26.97L0.21 -27.16L1.12 -34.92L2.78 -34.72L2.38 -31.34L5.6 -34.39L7.53 -34.16L4.28 -31.08L6.79 -26.39L4.9 -26.61L3.05 -30.09L2.14 -29.25L1.87 -26.97M12.22 -24.21L10.8 -25.1L14.96 -31.71L16.85 -30.52L15.51 -24.65L20.21 -28.41L22.1 -27.22L17.95 -20.61L16.53 -21.5L19.22 -25.78L14.99 -22.5L13.78 -23.26L14.91 -28.49L12.22 -24.21M22.68 -14.93L19.17 -19.19L25.19 -24.16L28.65 -19.97L27.56 -19.08L25.17 -21.98L23.79 -20.84L26.1 -18.04L25.03 -17.15L22.72 -19.95L21.32 -18.8L23.77 -15.83L22.68 -14.93";

/** A scroll event this recent means the page is still moving under the finger. */
const SCROLLING_WITHIN_MS = 120;

/**
 * One sparkle button: each click spins it and moves on to the next theme.
 * It has a solid fill because it floats over the page as it scrolls.
 *
 * A phone that is still scrolling spends a tap on stopping the scroll: the
 * finger goes down and up, but no click or pointerup ever arrives. So while
 * the page is moving, the button switches as soon as the finger touches it.
 * On a still page it waits for a normal click, so a swipe that starts on the
 * button still scrolls.
 */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const active = useTheme();
  const [spins, setSpins] = useState(0);
  const lastScroll = useRef(0);
  // A touch already switched the theme; the click that may follow is skipped.
  const handledTouch = useRef(false);

  useEffect(() => {
    const onScroll = () => (lastScroll.current = performance.now());
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const index = THEMES.findIndex((theme) => theme.id === active);
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  function cycle() {
    setTheme(next.id);
    setSpins((count) => count + 1);
  }

  return (
    <button
      type="button"
      aria-label={`Change color theme. Now ${current.label}, next ${next.label}.`}
      onTouchStart={() => {
        if (performance.now() - lastScroll.current > SCROLLING_WITHIN_MS) return;
        handledTouch.current = true;
        window.setTimeout(() => (handledTouch.current = false), 800);
        cycle();
      }}
      onClick={() => {
        if (handledTouch.current) {
          handledTouch.current = false;
          return;
        }
        cycle();
      }}
      className={`flex size-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border-2 border-ink bg-page outline-none transition-[background-color,border-color,scale] duration-300 hover:bg-[color-mix(in_srgb,var(--ink)_14%,var(--page))] focus-visible:bg-[color-mix(in_srgb,var(--ink)_14%,var(--page))] active:scale-90 before:absolute before:-inset-3 before:rounded-full before:content-[''] ${className}`}
    >
      {/* The sparkle looks the same every quarter turn, so half a turn per click reads as one spin. */}
      <Sparkle
        className="size-[22px] transition-[rotate] duration-700 ease-out-expo motion-reduce:transition-none"
        style={{ rotate: `${spins * 180}deg` }}
      />
      {/* The label runs once around the button per click, against the
          sparkle's spin; the fixed button is
          its positioning box. Its page-colored
          outline keeps it readable when the button floats over the poster. */}
      <svg
        viewBox="-40 -40 80 80"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-20 -translate-1/2 overflow-visible transition-[rotate] duration-700 ease-out-expo motion-reduce:transition-none"
        style={{ rotate: `${spins * -360}deg` }}
      >
        <path
          d={CLICK_ME_ARC}
          fill="currentColor"
          stroke="var(--page)"
          strokeWidth="3"
          strokeLinejoin="round"
          paintOrder="stroke"
          className="transition-[stroke] duration-300"
        />
      </svg>
    </button>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, isThemeId, type ThemeId } from "./theme-config";

// The theme lives on <html data-theme>, where the CSS reads it. This is a
// small store over that attribute so components can follow it too.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readTheme(): ThemeId {
  const value = document.documentElement.dataset.theme;
  return isThemeId(value) ? value : DEFAULT_THEME;
}

export function setTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function useTheme(): ThemeId {
  return useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
}

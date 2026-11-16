/**
 * Each theme also carries its own line about Wonder for the poster, set as two
 * lines (split at "\n") so every poster breaks with the longer line on top.
 */
export const THEMES = [
  { id: "rose", label: "Rose", statement: "Design and code with your\nagents on one canvas." },
  { id: "lemon", label: "Lemon", statement: "From first idea to shipped\nproduct on one canvas." },
  { id: "pool", label: "Pool", statement: "Your designs and your\ncode, side by side." },
  { id: "peach", label: "Peach", statement: "Build alongside agents\nthat design and code." },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "rose";
export const THEME_STORAGE_KEY = "codebara-theme";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

/**
 * Runs in <head> before the first paint, so a returning visitor's saved theme
 * is on <html> before any color is drawn.
 */
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(${JSON.stringify(THEMES.map((theme) => theme.id))}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

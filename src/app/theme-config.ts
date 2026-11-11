export const THEMES = [
  { id: "rose", label: "Rose" },
  { id: "lemon", label: "Lemon" },
  { id: "pool", label: "Pool" },
  { id: "peach", label: "Peach" },
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

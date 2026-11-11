"use client";

import { Fragment, useState } from "react";
import { THEMES, type ThemeId } from "./theme-config";
import { useTheme } from "./use-theme";

const statements = Object.fromEntries(
  THEMES.map((theme) => [theme.id, theme.statement]),
) as Record<ThemeId, string>;

/**
 * The poster's line about Wonder; each theme has its own. On a theme change
 * the old line lifts away and the new one arrives a word at a time.
 */
export function PosterStatement({ className = "" }: { className?: string }) {
  const theme = useTheme();
  // The old line stays in place, on top, until it has finished leaving.
  const [layers, setLayers] = useState<ThemeId[]>([theme]);

  if (layers[layers.length - 1] !== theme) {
    setLayers([layers[layers.length - 1], theme]);
  }

  const leaving = layers.length > 1 ? layers[0] : null;

  return (
    <p className={`relative ${className}`}>
      {leaving && (
        <span
          key={`leaving-${leaving}`}
          aria-hidden="true"
          className="poster-statement-out absolute inset-0"
          onAnimationEnd={() => setLayers((current) => current.slice(-1))}
        >
          {statements[leaving]}
        </span>
      )}
      <span key={theme} className="block">
        {statements[theme].split(" ").map((word, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span
              className="poster-word inline-block"
              style={{ animationDelay: `${120 + index * 45}ms` }}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </p>
  );
}

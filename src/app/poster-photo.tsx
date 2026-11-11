"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import lemon from "../../public/lemon-poster.jpg";
import peach from "../../public/peach-poster.jpg";
import pool from "../../public/pool-poster.jpg";
// Each photo has its flip, sepia and shade already baked in.
import sea from "../../public/sea-poster-graded.jpg";
import type { ThemeId } from "./theme-config";
import { useTheme } from "./use-theme";

const photos: Record<ThemeId, { src: StaticImageData; alt: string }> = {
  rose: {
    src: sea,
    alt: "The sea seen from a rocky coast, with pink bougainvillea in the foreground",
  },
  lemon: { src: lemon, alt: "A lemon tree branch against a deep blue sky" },
  pool: { src: pool, alt: "An orange tree branch over turquoise pool water" },
  peach: { src: peach, alt: "A peach tree branch against a deep blue sky" },
};

function Photo({
  theme,
  incoming,
  onShown,
}: {
  theme: ThemeId;
  incoming: boolean;
  onShown: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const photo = photos[theme];
  // An incoming photo stays hidden until it has loaded, then opens over the
  // old one. The first photo just shows, with its blur placeholder.
  const state = !incoming ? "" : loaded ? "poster-photo-in" : "opacity-0";

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="(min-width: 912px) 880px, 100vw"
      placeholder={incoming ? "empty" : "blur"}
      loading="eager"
      onLoad={() => setLoaded(true)}
      onAnimationEnd={onShown}
      className={`object-cover ${state}`}
    />
  );
}

export function PosterPhoto() {
  const theme = useTheme();
  // The old photo stays underneath until the new one has finished opening.
  const [layers, setLayers] = useState<ThemeId[]>([theme]);

  if (layers[layers.length - 1] !== theme) {
    setLayers([layers[layers.length - 1], theme]);
  }

  return layers.map((layer, index) => (
    <Photo
      key={layer}
      theme={layer}
      incoming={index > 0}
      onShown={() => setLayers((current) => (current.length > 1 ? current.slice(-1) : current))}
    />
  ));
}

"use client";

import { useEffect, useState } from "react";
import { isSoundEnabled, toggleSoundEnabled } from "@/lib/audio/sound-settings";
import { cn } from "@/lib/utils/cn";

export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const sync = () => setOn(isSoundEnabled());
    sync();
    window.addEventListener("nahndev-sound-toggle", sync);
    return () => window.removeEventListener("nahndev-sound-toggle", sync);
  }, []);

  return (
    <button
      type="button"
      className={cn("sound-toggle", className)}
      aria-pressed={on}
      aria-label={on ? "Mute sound effects" : "Enable sound effects"}
      title={on ? "Mute (M)" : "Sound on (M)"}
      onClick={() => setOn(toggleSoundEnabled())}
    >
      {on ? "🔊" : "🔇"}
    </button>
  );
}

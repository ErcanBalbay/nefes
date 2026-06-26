import { useRef, useState } from "react";

export type SoundKey = "rain" | "forest" | "ocean" | "none";

const STORAGE_KEY = "nefes_sound";

const SOUND_PATHS: Record<Exclude<SoundKey, "none">, string> = {
  rain: "/audio/rain.mp3",
  forest: "/audio/forest.mp3",
  ocean: "/audio/ocean.mp3",
};

function loadPreference(): SoundKey {
  if (typeof window === "undefined") return "none";
  return (localStorage.getItem(STORAGE_KEY) as SoundKey) ?? "none";
}

export function useAudio() {
  const [sound, setSound] = useState<SoundKey>(loadPreference);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // ref ile stale closure sorunu önlenir
  const soundRef = useRef<SoundKey>(sound);
  soundRef.current = sound;

  function changeSound(key: SoundKey) {
    localStorage.setItem(STORAGE_KEY, key);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSound(key);
  }

  function play() {
    const current = soundRef.current;
    if (current === "none") return;
    // iOS: Audio elementi gesture handler içinde yaratılmalı
    if (!audioRef.current) {
      const a = new Audio(SOUND_PATHS[current]);
      a.loop = true;
      a.volume = 0.35;
      audioRef.current = a;
    }
    audioRef.current.play().catch(() => {});
  }

  function pause() {
    audioRef.current?.pause();
  }

  return { sound, changeSound, play, pause };
}

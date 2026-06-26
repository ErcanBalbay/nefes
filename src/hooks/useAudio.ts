import { useEffect, useRef, useState } from "react";

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

  // ses değişince yeni Audio instance hazırla
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (sound === "none") return;

    const audio = new Audio(SOUND_PATHS[sound]);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [sound]);

  function changeSound(key: SoundKey) {
    localStorage.setItem(STORAGE_KEY, key);
    setSound(key);
  }

  // iOS'ta play() mutlaka kullanıcı gesture handler içinde çağrılmalı
  function play() {
    audioRef.current?.play().catch(() => {});
  }

  function pause() {
    audioRef.current?.pause();
  }

  return { sound, changeSound, play, pause };
}

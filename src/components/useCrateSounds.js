import useSound from "use-sound";

export default function useCrateSounds(baseVolume = 1, isMuted = false, overallVolume = 1) {
  const effectiveVolume = isMuted ? 0 : baseVolume * overallVolume;

  const [playLidOpen] = useSound("/sounds/lid-open.mp3", {
    volume: effectiveVolume,
  });

  const [playBigPrize] = useSound("/sounds/rare-sparkle.mp3", {
    volume: effectiveVolume,
  });

  const [playTick] = useSound("/sounds/tick.mp3", {
    volume: effectiveVolume * 0.6, // 👈 Lower the tick volume specifically
  });

  return {
    playLidOpen,
    playBigPrize,
    playTick,
  };
}

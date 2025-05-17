import useSound from "use-sound";

export default function useCrateSounds() {
  const [playLidOpen] = useSound("/sounds/lid-open.mp3", {
    volume: 0.3,
  });

  const [playBGM, { stop: stopBGM }] = useSound("/sounds/background.mp3", {
    loop: true,
    volume: 0.2,
    soundEnabled: true,
  });

  return {
    playLidOpen,
    playBGM,
    stopBGM,
  };
}

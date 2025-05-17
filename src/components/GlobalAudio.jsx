import { useEffect } from "react";
import useSound from "use-sound";

export default function GlobalAudio() {
  const [play, { stop }] = useSound("/sounds/background.mp3", {
    loop: true,
    volume: 0.2,
  });

  useEffect(() => {
    play();
    return () => stop();
  }, [play, stop]);

  return null;
}

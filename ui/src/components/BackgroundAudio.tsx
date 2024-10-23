import { useEffect, useRef } from "react";

interface Props {
  isPlayingGame: boolean;
}

const BackgroundAudio = ({ isPlayingGame }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src={isPlayingGame ? "/sounds/play.mp3" : "/sounds/background.mp3"}
      loop
      autoPlay
      //   muted
    />
  );
};

export default BackgroundAudio;

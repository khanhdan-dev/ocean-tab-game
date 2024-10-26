import { useEffect, useRef } from 'react';

interface Props {
  isPlayingGame: boolean;
  isPlayingMusic: boolean;
}

const BackgroundAudio = ({ isPlayingGame, isPlayingMusic }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayingMusic]);

  return (
    <audio
      ref={audioRef}
      src={isPlayingGame ? '/sounds/play.mp3' : '/sounds/background.mp3'}
      loop
      autoPlay
      //   muted
    />
  );
};

export default BackgroundAudio;

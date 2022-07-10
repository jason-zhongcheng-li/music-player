import { useMemo, useEffect } from 'react';
import { Svg } from '../svg/svg';
import { useITunes } from '../../contexts/MusicProvider';

import styles from './music-controller.module.scss';

interface MusicControllerProps {
  autoPlay?: boolean;
}

const MusicController = ({ autoPlay }: MusicControllerProps) => {
  const { isPlaying, playOrPause, soungSelected } = useITunes();

  const audio = useMemo(() => (soungSelected ? new Audio(soungSelected.previewUrl) : null), [soungSelected]);

  useEffect(() => {
    if (!audio) {
      return;
    } else if (isPlaying) {
      audio.play();
    }
    return () => {
      if (audio && isPlaying) {
        audio.pause();
      }
    };
  }, [isPlaying, audio]);

  useEffect(() => {
    if (autoPlay) {
      playOrPause();
    }
  }, [autoPlay]);

  return (
    <div className={styles.controllers}>
      <Svg name="rewind" />
      <Svg name={isPlaying ? 'pause' : 'play'} onClick={() => playOrPause()} />
      <Svg name="forward" />
    </div>
  );
};

export default MusicController;

import { useMemo, useEffect } from 'react';
import { Svg } from '../svg/svg';
import { useITunes } from '../../contexts/MusicProvider';
import classnames from 'classnames';

import styles from './music-controller.module.scss';

interface MusicControllerProps {
  className?: string;
}

const MusicController = ({ className }: MusicControllerProps) => {
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

  return (
    <div className={classnames(styles.controllers, className)}>
      <Svg name="rewind" />
      <Svg name={isPlaying ? 'pause' : 'play'} onClick={() => playOrPause()} />
      <Svg name="forward" />
    </div>
  );
};

export default MusicController;

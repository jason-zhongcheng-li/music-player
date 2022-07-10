import { Svg } from '../svg/svg';
import { useITunes } from '../../contexts/MusicProvider';
import classnames from 'classnames';

import styles from './music-controller.module.scss';

interface MusicControllerProps {
  className?: string;
}

const MusicController = ({ className }: MusicControllerProps) => {
  const { isPlaying, playOrPause, skipSong } = useITunes();

  return (
    <div className={classnames(styles.controllers, className)}>
      <Svg name="rewind" onClick={() => skipSong('rewind')} />
      <Svg name={isPlaying ? 'pause' : 'play'} onClick={() => playOrPause()} />
      <Svg name="forward" onClick={() => skipSong('forward')} />
    </div>
  );
};

export default MusicController;

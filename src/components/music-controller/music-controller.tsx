import { Svg } from '../svg/svg';
import { useITunes } from '../../contexts/MusicProvider';
import classnames from 'classnames';
import { debounce } from 'lodash';

import styles from './music-controller.module.scss';

interface MusicControllerProps {
  className?: string;
}

const MusicController = ({ className }: MusicControllerProps) => {
  const { isPlaying, playOrPause, skipSong } = useITunes();

  // prevent bouncing click
  const playNext = debounce(async (value: 'rewind' | 'forward') => {
    skipSong(value);
  }, 250);

  return (
    <div className={classnames(styles.controllers, className)}>
      <Svg name="rewind" onClick={() => playNext('rewind')} />
      <Svg name={isPlaying ? 'pause' : 'play'} onClick={() => playOrPause()} />
      <Svg name="forward" onClick={() => playNext('forward')} />
    </div>
  );
};

export default MusicController;

import classnames from 'classnames';

import styles from './sound-wave.module.scss';

interface SoundWaveProps {
  enabled: boolean;
  length: number;
}

const SoundWave = ({ enabled, length }: SoundWaveProps) => {
  const waves = () => {
    const bars = [];
    for (let i = 0; i < length; i++) {
      const left = i * 2 + 1;
      const anim = Math.floor(Math.random() * 75 + 400);
      const height = Math.floor(Math.random() * 6 + 3);
      bars.push(
        <div
          key={i}
          className={classnames(styles.bar, enabled && styles.enabled)}
          style={{ left: `${left}px`, animationDuration: `${anim}ms`, height: `${height}px` }}
        ></div>
      );
    }
    return bars;
  };

  return <div className={styles.bars}>{waves()}</div>;
};

export default SoundWave;

import React from 'react';

import styles from './media-player.module.scss';

const MediaPlayer = () => {
  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.albumList}></div>
      <div className={styles.songList}></div>
    </div>
  );
};

export default MediaPlayer;

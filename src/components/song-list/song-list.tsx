import React from 'react';
import { Song } from '../../models/song';
import { useITunes } from '../../contexts/MusicProvider';

import styles from './song-list.module.scss';

const SongList = () => {
  const { songs } = useITunes();

  return (
    <div className={styles.wrapper}>
      {songs
        ?.filter((song: Song) => !!song.collectionId)
        .map((song: Song) => (
          <div className={styles.track} key={song.trackId}>
            <div className={styles.trackName}>{song.trackCensoredName}</div>
            <div className={styles.artistName}>{song.artistName}</div>
            <div className={styles.collectionName}>{song.collectionCensoredName}</div>
          </div>
        ))}
    </div>
  );
};

export default SongList;

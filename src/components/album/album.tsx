import React, { useState, useEffect } from 'react';
import { Image } from '../image/image';
import { Svg } from '../svg/svg';

import styles from './album.module.scss';
import { useITunes } from '../../contexts/MusicProvider';

const Album = () => {
  const { collection, selectSong } = useITunes();
  const [artistViewUrl, setArtistViewUrl] = useState<string>();

  useEffect(() => {
    if (collection?.album) {
      setArtistViewUrl(collection?.album.artworkUrl100);
    }
    if (Array.isArray(collection?.songs)) {
      selectSong(collection.songs[0]?.trackId);
    }
    return () => setArtistViewUrl(null);
  }, [collection, selectSong]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.albumArt}>
        {artistViewUrl && (
          <>
            <Image image={{ url: artistViewUrl }} className={styles.albumArtImage} />
          </>
        )}
      </div>
      <div className={styles.songlist}>
        {collection?.songs
          ?.filter((song) => song.kind === 'song')
          .map((song) => (
            <div className={styles.song} key={song.trackId}>
              <div className={styles.songName}>
                <Svg name="music" />
                <span>{song.trackCensoredName}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Album;

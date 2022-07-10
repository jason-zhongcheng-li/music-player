import React, { useState, useEffect } from 'react';
import { Image } from '../image/image';
import { Svg } from '../svg/svg';
import { useITunes } from '../../contexts/MusicProvider';
import SoundWave from '../sound-wave/sound-wave';

import styles from './album.module.scss';

const Album = () => {
  const { collection, selectSong, isPlaying, soungSelected } = useITunes();
  const [artistViewUrl, setArtistViewUrl] = useState<string>();
  const [showSoundWave, setShowSoundWave] = useState<boolean>(false);

  useEffect(() => {
    if (collection?.album) {
      setArtistViewUrl(collection?.album.artworkUrl100);
    }
    if (Array.isArray(collection?.songs)) {
      selectSong(collection.songs[0]?.trackId);
    }
    return () => setArtistViewUrl(null);
  }, [collection, selectSong]);

  useEffect(() => {
    if (isPlaying && !showSoundWave) {
      setShowSoundWave(true);
    }
  }, [isPlaying]);

  const isOnPlaying = (trackId: number) => {
    return soungSelected?.trackId === trackId && showSoundWave;
  };

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
              {isOnPlaying(song.trackId) && <SoundWave length={10} enabled={isPlaying} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Album;

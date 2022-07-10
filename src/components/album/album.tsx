import React, { useState, useEffect } from 'react';
import { Image } from '../image/image';
import { Svg } from '../svg/svg';
import SoundWave from '../sound-wave/sound-wave';
import MusicController from '../music-controller/music-controller';
import { converToMin } from '../../helper/string-helper';
import { Collection } from '../../models/collection';
import Loading from '../loading/loading';

import styles from './album.module.scss';

interface AlbumProps {
  collection: Collection;
  isPlaying: boolean;
  currSongIndex: number;
  selectMusic: (index: number, autoPlay?: boolean) => void;
  isLoading?: boolean;
}

const Album = (props: AlbumProps) => {
  const { collection, selectMusic, currSongIndex, isPlaying, isLoading } = props;
  const [artistViewUrl, setArtistViewUrl] = useState<string>();
  const [showSoundWave, setShowSoundWave] = useState<boolean>(false);

  const resetPageState = () => {
    setShowSoundWave(false);
    setArtistViewUrl(null);
  };

  useEffect(() => {
    if (collection?.album) {
      setArtistViewUrl(collection?.album.artworkUrl100);
    }
    if (Array.isArray(collection?.songs)) {
      // select 1st song as default audio
      selectMusic(0);
    }
    return () => resetPageState();
  }, [collection]);

  useEffect(() => {
    if (isPlaying && !showSoundWave) {
      setShowSoundWave(true);
    }
  }, [isPlaying, showSoundWave]);

  const isOnPlaying = (idx: number) => {
    return currSongIndex === idx;
  };

  return (
    <div className={styles.wrapper}>
      <Loading enabled={isLoading} />
      {!isLoading && (
        <>
          <div className={styles.albumArt}>
            {artistViewUrl && (
              <>
                <Image image={{ url: artistViewUrl }} className={styles.albumArtImage} />
                <MusicController />
              </>
            )}
          </div>
          <div className={styles.songlist}>
            {collection?.songs
              ?.filter((song) => song.kind === 'song')
              .map((song, index) => (
                <div className={styles.song} key={song.trackId}>
                  <div className={styles.songName}>
                    <Svg name="music" />
                    <span>{song.trackCensoredName}</span>
                  </div>
                  {isOnPlaying(index) && <SoundWave length={10} enabled={isPlaying} />}
                  <div className={styles.songInfo}>
                    <span>{converToMin(song.trackTimeMillis)}</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Album;

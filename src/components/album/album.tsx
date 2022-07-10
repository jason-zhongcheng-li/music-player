import React, { useState, useEffect } from 'react';
import { Image } from '../image/image';
import logo from '../../assets/logo.svg';
import { Svg } from '../svg/svg';
import SoundWave from '../sound-wave/sound-wave';
import MusicController from '../music-controller/music-controller';
import { converToMin } from '../../helper/string-helper';
import { Collection } from '../../models/collection';
import { Song } from '../../models/song';

import styles from './album.module.scss';

interface AlbumProps {
  collection: Collection;
  selectSong: (trackId: number) => void;
  soungSelected: Song;
  isPlaying: boolean;
  isLoading?: boolean;
}

const Album = (props: AlbumProps) => {
  const { collection, selectSong, isPlaying, soungSelected, isLoading } = props;
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
      selectSong(collection.songs[0]?.trackId);
    }
    return () => resetPageState();
  }, [collection, selectSong]);

  useEffect(() => {
    if (isPlaying && !showSoundWave) {
      setShowSoundWave(true);
    }
  }, [isPlaying, showSoundWave]);

  const isOnPlaying = (trackId: number) => {
    return soungSelected?.trackId === trackId && showSoundWave;
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <img src={logo} className="App-logo" alt="logo" />
      ) : (
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
              .map((song) => (
                <div className={styles.song} key={song.trackId}>
                  <div className={styles.songName}>
                    <Svg name="music" />
                    <span>{song.trackCensoredName}</span>
                  </div>
                  {isOnPlaying(song.trackId) && <SoundWave length={10} enabled={isPlaying} />}
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

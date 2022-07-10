import React, { useState, useEffect } from 'react';
import { Image } from '../image/image';
import { Svg } from '../svg/svg';
import SoundWave from '../sound-wave/sound-wave';
import MusicController from '../music-controller/music-controller';
import { converToMin } from '../../helper/string-helper';
import { Collection } from '../../models/collection';
import Loading from '../loading/loading';

import styles from './album.module.scss';
import { CurrentSong } from '../../models/song';

interface AlbumProps {
  collection: Collection;
  isPlaying: boolean;
  currSong: CurrentSong;
  playMusic: (play: boolean, song?: CurrentSong) => void;
  isLoading?: boolean;
}

const Album = (props: AlbumProps) => {
  const { collection, currSong, isPlaying, isLoading, playMusic } = props;
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

    return () => resetPageState();
  }, [collection]);

  useEffect(() => {
    if (isPlaying && !showSoundWave) {
      setShowSoundWave(true);
    }
  }, [isPlaying, showSoundWave]);

  const isOnPlaying = (idx: number) => {
    return currSong?.index === idx;
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
                <div
                  className={styles.song}
                  key={song.trackId}
                  role="button"
                  tabIndex={index}
                  onClick={() => {
                    playMusic(true, { trackId: song.trackId, index });
                  }}
                >
                  <div className={styles.songName}>
                    <Svg name="music" />
                    <span>{song.trackCensoredName}</span>
                  </div>
                  <div className={styles.songInfo}>
                    {isOnPlaying(index) && <SoundWave length={10} enabled={isPlaying} />}
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

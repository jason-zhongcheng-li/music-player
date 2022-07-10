import { Image } from '../image/image';
import { Song } from '../../models/song';

import styles from './song-list.module.scss';
import SoundWave from '../sound-wave/sound-wave';
import { useState, useEffect } from 'react';

interface SongListProps {
  songs: Array<Song>;
  autoPlay: boolean;
  isPlaying: boolean;
  currSongIndex: number;
  setPlayList: (songs: Array<Song>) => void;
  searchSongsByAlbum: (collectionId: number) => Promise<void>;
  playMusic: (play: boolean, index?: number) => void;
}

const SongList = (props: SongListProps) => {
  const { songs, searchSongsByAlbum, playMusic, autoPlay, isPlaying, currSongIndex, setPlayList } = props;

  const [showSoundWave, setShowSoundWave] = useState<boolean>(false);

  useEffect(() => {
    setShowSoundWave(false);
  }, [songs]);

  const isOnPlaying = (idx: number) => {
    return currSongIndex === idx;
  };

  if (!songs) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {songs
        .filter((song) => !!song.collectionId)
        .map((song, index) => (
          <div
            key={song.trackId}
            className={styles.container}
            role="button"
            tabIndex={index}
            onClick={() => {
              if (autoPlay) {
                playMusic(true, index);
                setPlayList(songs);
                setShowSoundWave(true);
              } else {
                searchSongsByAlbum(song.collectionId);
              }
            }}
          >
            <div className={styles.track}>
              <div className={styles.trackInner}>
                <Image image={{ url: song.artworkUrl60 }} />
                <div className={styles.trackInfo}>
                  <div className={styles.trackName}>{song.trackCensoredName}</div>
                  <div className={styles.artistName}>{song.artistName}</div>
                  <div className={styles.collectionName}>{song.collectionCensoredName}</div>
                </div>
              </div>
              {autoPlay && showSoundWave && (
                <div className={styles.trackStatus}>
                  {isOnPlaying(index) && (
                    <SoundWave length={10} enabled={isPlaying} className={styles.trackStatusSoundWave} />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongList;

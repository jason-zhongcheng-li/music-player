import { Image } from '../image/image';
import { Song, CurrentSong } from '../../models/song';
import SoundWave from '../sound-wave/sound-wave';

import styles from './song-list.module.scss';

interface SongListProps {
  songs: Array<Song>;
  autoPlay: boolean;
  isPlaying: boolean;
  currSong: CurrentSong;
  playedSongs: Array<CurrentSong>;
  setPlayList: (songs: Array<Song>) => void;
  searchSongsByAlbum: (collectionId: number) => Promise<void>;
  playMusic: (play: boolean, song?: CurrentSong) => void;
}

const SongList = (props: SongListProps) => {
  const { songs, searchSongsByAlbum, playMusic, autoPlay, isPlaying, currSong, setPlayList, playedSongs } = props;

  const isOnPlaying = (trackId: number) => {
    return currSong?.trackId === trackId;
  };

  const isPlayed = (trackId: number, index: number) => {
    return !!playedSongs.find((song) => song.index === index && song.trackId === trackId);
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
                playMusic(true, { trackId: song.trackId, index });
                setPlayList(songs);
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
                  {isPlayed(song.trackId, index) && <span className={styles.trackPlayed}>played</span>}
                </div>
              </div>
              {autoPlay && (
                <div className={styles.trackStatus}>
                  {isOnPlaying(song.trackId) && (
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

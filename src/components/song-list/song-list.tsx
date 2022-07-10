import { Image } from '../image/image';
import { Song } from '../../models/song';

import styles from './song-list.module.scss';

interface SongListProps {
  songs: Array<Song>;
  autoPlay?: boolean;
  searchSongsByAlbum: (collectionId: number) => Promise<void>;
  selectMusic: (index: number, autoPlay?: boolean) => void;
}

const SongList = (props: SongListProps) => {
  const { songs, searchSongsByAlbum, selectMusic, autoPlay } = props;

  if (!songs) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      {songs
        .filter((song) => !!song.collectionId)
        .map((song, index) => (
          <div className={styles.track} key={song.trackId}>
            <Image image={{ url: song.artworkUrl60 }} />
            <div
              className={styles.trackInfo}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (autoPlay) {
                  selectMusic(index, autoPlay);
                } else {
                  searchSongsByAlbum(song.collectionId);
                }
              }}
            >
              <div className={styles.trackName}>{song.trackCensoredName}</div>
              <div className={styles.artistName}>{song.artistName}</div>
              <div className={styles.collectionName}>{song.collectionCensoredName}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongList;

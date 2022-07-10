import { Image } from '../image/image';
import { Song } from '../../models/song';

import styles from './song-list.module.scss';

interface SongListProps {
  songs: Array<Song>;
  lookupSongsInAlbum: (collectionId: number) => Promise<void>;
}

const SongList = (props: SongListProps) => {
  const { songs, lookupSongsInAlbum } = props;
  const getSongsInAlbum = async (collectionId: number) => {
    await lookupSongsInAlbum(collectionId);
  };

  return (
    <div className={styles.wrapper}>
      {songs
        ?.filter((song: Song) => !!song.collectionId)
        .map((song: Song) => (
          <div className={styles.track} key={song.trackId}>
            <Image image={{ url: song.artworkUrl60 }} />
            <div
              className={styles.trackInfo}
              role="button"
              tabIndex={0}
              onClick={() => getSongsInAlbum(song.collectionId)}
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

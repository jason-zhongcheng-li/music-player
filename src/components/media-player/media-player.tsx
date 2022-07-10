import SearchBar from '../search/search-bar';
import SongList from '../song-list/song-list';
import Album from '../album/album';
import { useITunes } from '../../contexts/MusicProvider';

import styles from './media-player.module.scss';

const MediaPlayer = () => {
  const { searchSongs, isLoading, collection, selectSong, songs, isPlaying, soungSelected, lookupSongsInAlbum } =
    useITunes();

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.albumList}>
        <SearchBar searchSongs={searchSongs} />
        <SongList lookupSongsInAlbum={lookupSongsInAlbum} songs={songs} />
      </div>
      <div className={styles.songList}>
        <Album
          isLoading={isLoading}
          collection={collection}
          selectSong={selectSong}
          isPlaying={isPlaying}
          soungSelected={soungSelected}
        />
      </div>
    </div>
  );
};

export default MediaPlayer;

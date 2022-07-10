import SearchBar from '../search/search-bar';
import SongList from '../song-list/song-list';
import Album from '../album/album';
import { useITunes } from '../../contexts/MusicProvider';
import useViewportSizes from 'use-viewport-sizes';
import { Breakpoint } from '../../helper/string-helper';
import MusicController from '../music-controller/music-controller';

import styles from './media-player.module.scss';

const MediaPlayer = () => {
  const { searchSongs, isLoading, collection, selectSong, songs, isPlaying, soungSelected, lookupSongsInAlbum } =
    useITunes();
  const [vpWith] = useViewportSizes({ dimension: 'w' });

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.songList}>
        <SearchBar searchSongs={searchSongs} />
        <SongList lookupSongsInAlbum={lookupSongsInAlbum} songs={songs} autoPlay={vpWith <= Breakpoint.tablet} />
      </div>
      {vpWith >= Breakpoint.tablet ? (
        <div className={styles.album}>
          <Album
            isLoading={isLoading}
            collection={collection}
            selectSong={selectSong}
            isPlaying={isPlaying}
            soungSelected={soungSelected}
          />
        </div>
      ) : (
        <MusicController className={styles.controller} />
      )}
    </div>
  );
};

export default MediaPlayer;

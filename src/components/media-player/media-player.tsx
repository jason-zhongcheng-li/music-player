import SearchBar from '../search/search-bar';
import SongList from '../song-list/song-list';
import Album from '../album/album';
import { useITunes } from '../../contexts/MusicProvider';
import MusicController from '../music-controller/music-controller';
import Drawer from '../drawer/drawer';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Song } from '../../models/song';
import { Collection } from '../../models/collection';
import useViewportSizes from 'use-viewport-sizes';
import { Breakpoint } from '../../helper/string-helper';

import styles from './media-player.module.scss';

const MediaPlayer = () => {
  const { searchSongs, isLoading, setPlayList, isPlaying, lookupSongsInAlbum, currSong, playMusic, playedSongs } =
    useITunes();
  const [showController, setShowController] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<Song>>(null);
  const [collection, setCollection] = useState<Collection>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [vpWith] = useViewportSizes({ dimension: 'w' });

  useLayoutEffect(() => {
    if (vpWith < Breakpoint.tablet) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [vpWith]);

  useEffect(() => {
    if (isPlaying) {
      setShowController(true);
    }
  }, [isPlaying]);

  const searchSongsByTerm = async (term: string): Promise<void> => {
    const result = await searchSongs(term);
    setPlayList(result);
    setSearchResult(result);
  };

  const searchSongsByAlbum = async (collectionId: number): Promise<void> => {
    const collection = await lookupSongsInAlbum(collectionId);
    setPlayList(collection?.songs);
    setCollection(collection);
  };

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.songList}>
        <SearchBar searchSongs={searchSongsByTerm} />
        <SongList
          searchSongsByAlbum={searchSongsByAlbum}
          playMusic={playMusic}
          songs={searchResult}
          isPlaying={isPlaying}
          currSong={currSong}
          setPlayList={setPlayList}
          autoPlay={isMobile}
          playedSongs={playedSongs}
        />
      </div>
      {!isMobile ? (
        <div className={styles.album}>
          <Album
            isLoading={isLoading}
            playMusic={playMusic}
            currSong={currSong}
            collection={collection}
            isPlaying={isPlaying}
            playedSongs={playedSongs}
          />
        </div>
      ) : (
        <Drawer isOpen={showController} openFrom="bottom" classes={{ drawer: styles.controller }} fullwidthMobile>
          <MusicController className={(styles.controller, isPlaying && styles.isPlaying)} />
        </Drawer>
      )}
    </div>
  );
};

export default MediaPlayer;

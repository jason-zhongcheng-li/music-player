import { useMemo, useState } from 'react';
import { createSafeContext, useSafeContext } from '../helper/context-helpers';
import { ApiService } from '../services/api';
import { ApiServiceImpl } from '../services/impl/api-service-impl';
import { Song } from '../models/song';
import { Collection } from '../models/collection';

interface MusicProviderState {
  isPlaying: boolean;
  collection: Collection;
  songs: Array<Song>;
  soungSelected: Song;
  playOrPause: () => void;
  selectSong: (trackId: number) => void;
  lookupSongsInAlbum: (collectionId: number) => Promise<void>;
  searchSongs: (searchValue: string) => Promise<void>;
}

export const MusicContext = createSafeContext<MusicProviderState>();

export const MusicProvider = (props) => {
  const { children: childrenProps } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection>(null);
  const [songs, setSongs] = useState<Array<Song>>(null);
  const [soungSelected, setSoungSelected] = useState<Song>(null);
  const apiService: ApiService = new ApiServiceImpl();

  const playOrPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectSong = (trackId: number) => {
    const [soungSelected] = songs.filter((song) => song.trackId === trackId);
    setSoungSelected(soungSelected);
  };

  const searchSongs = async (searchValue: string): Promise<void> => {
    const encodedValue = encodeURI(searchValue);
    let songs = [] as Array<Song>;
    const iTunesResponse = await apiService.searchSongs(encodedValue);
    if (iTunesResponse.kind === 'success') {
      songs = iTunesResponse.response;
    }
    setSongs(songs);
  };

  const lookupSongsInAlbum = async (collectionId: number): Promise<void> => {
    let collection = {} as Collection;
    setIsPlaying(false);
    setCollection(null);
    const iTunesResponse = await apiService.lookUpSongsInAlbum(collectionId);
    if (iTunesResponse.kind === 'success') {
      collection = iTunesResponse.response;
    }
    setCollection(collection);
  };

  const values = useMemo(
    () => ({ isPlaying, playOrPause, songs, soungSelected, collection, selectSong, lookupSongsInAlbum, searchSongs }),
    // eslint-disable-next-line
    [isPlaying, songs, soungSelected, collection]
  );

  return <MusicContext.Provider value={values}>{childrenProps}</MusicContext.Provider>;
};

export const useITunes = () => useSafeContext(MusicContext);

import { useMemo, useState, useEffect } from 'react';
import { createSafeContext, useSafeContext } from '../helper/context-helpers';
import { ApiService } from '../services/api';
import { ApiServiceImpl } from '../services/impl/api-service-impl';
import { Song } from '../models/song';
import { Collection } from '../models/collection';

interface MusicProviderState {
  isPlaying: boolean;
  isLoading: boolean;
  currSongIndex: number;
  selectSong: (idx: number) => void;
  playMusic: (autoPlay: boolean) => void;
  playOrPause: () => void;
  skipSong: (skipTo: 'rewind' | 'forward') => void;
  setPlayList: (songs: Array<Song>) => void;
  lookupSongsInAlbum: (collectionId: number) => Promise<Collection>;
  searchSongs: (searchValue: string) => Promise<Array<Song>>;
}

export const MusicContext = createSafeContext<MusicProviderState>();

export const MusicProvider = (props) => {
  const { children: childrenProps } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songs, setSongs] = useState<Array<Song>>(null);
  const [currSongIndex, setCurrSongIndex] = useState<number>(-1);
  const apiService: ApiService = new ApiServiceImpl();

  const audio = useMemo(
    () => (songs && songs[currSongIndex] ? new Audio(songs[currSongIndex]?.previewUrl) : null),
    [currSongIndex, songs]
  );

  const playOrPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!audio) {
      return;
    } else if (isPlaying) {
      audio.play();
    }
    return () => {
      if (audio && isPlaying) {
        audio.pause();
      }
    };
  }, [isPlaying, audio]);

  const searchSongs = async (searchValue: string): Promise<Array<Song>> => {
    const encodedValue = encodeURI(searchValue);
    let songs = [] as Array<Song>;
    const iTunesResponse = await apiService.searchSongs(encodedValue);
    if (iTunesResponse.kind === 'success') {
      songs = iTunesResponse.response;
    }
    return songs;
  };

  const lookupSongsInAlbum = async (collectionId: number): Promise<Collection> => {
    setIsLoading(true);
    let collection = {} as Collection;
    const iTunesResponse = await apiService.lookUpSongsInAlbum(collectionId);
    if (iTunesResponse.kind === 'success') {
      collection = iTunesResponse.response;
    }
    setIsLoading(false);
    return collection;
  };

  const skipSong = (skipTo: 'rewind' | 'forward') => {
    const maxIndex = songs.length - 1;
    const newIndex =
      skipTo === 'forward'
        ? currSongIndex < maxIndex
          ? currSongIndex + 1
          : currSongIndex
        : currSongIndex > 0
        ? currSongIndex - 1
        : currSongIndex;
    setCurrSongIndex(newIndex);
  };

  const setPlayList = (songs: Array<Song>) => {
    setSongs(songs);
  };

  const selectSong = (idx: number): void => {
    setCurrSongIndex(idx);
  };

  const playMusic = (autoPlay: boolean): void => {
    setIsPlaying(autoPlay);
  };

  const values = useMemo(
    () => ({
      isPlaying,
      isLoading,
      playOrPause,
      skipSong,
      lookupSongsInAlbum,
      currSongIndex,
      setPlayList,
      selectSong,
      searchSongs,
      playMusic,
    }),
    // eslint-disable-next-line
    [isPlaying, isLoading, skipSong, currSongIndex, songs]
  );

  return <MusicContext.Provider value={values}>{childrenProps}</MusicContext.Provider>;
};

export const useITunes = () => useSafeContext(MusicContext);

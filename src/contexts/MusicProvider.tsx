import { useMemo, useState, useEffect } from 'react';
import { createSafeContext, useSafeContext } from '../helper/context-helpers';
import { ApiService } from '../services/api';
import { ApiServiceImpl } from '../services/impl/api-service-impl';
import { Song } from '../models/song';
import { Collection } from '../models/collection';
import useViewportSizes from 'use-viewport-sizes';
import { Breakpoint } from '../helper/string-helper';

interface MusicProviderState {
  isPlaying: boolean;
  isLoading: boolean;
  currSongIndex: number;
  isMobile: boolean;
  playMusic: (play: boolean, index?: number) => void;
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [songs, setSongs] = useState<Array<Song>>(null);
  const [currSongIndex, setCurrSongIndex] = useState<number>(-1);
  const [vpWith] = useViewportSizes({ dimension: 'w' });
  const apiService: ApiService = new ApiServiceImpl();

  useEffect(() => {
    if (vpWith < Breakpoint.tablet) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [vpWith]);

  const audio = useMemo(
    () => (songs && songs[currSongIndex] ? new Audio(songs[currSongIndex]?.previewUrl) : null),
    [currSongIndex]
  );

  audio?.addEventListener('ended', () => {
    setIsPlaying(false);
  });

  useEffect(() => {
    if (!audio) {
      return;
    } else if (isPlaying) {
      audio.play();
    }
    return () => {
      // prevent calling play() from another play()
      if (audio) {
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
    setCurrSongIndex(-1);
    setIsPlaying(false);
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
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const setPlayList = (songs: Array<Song>) => {
    setSongs(songs);
  };

  const playMusic = (play: boolean, index?: number): void => {
    if (currSongIndex < 0 && index === undefined) {
      setCurrSongIndex(0);
    } else if (index) {
      setCurrSongIndex(index);
    }
    setIsPlaying(play);
  };

  const playOrPause = () => {
    playMusic(!isPlaying);
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
      searchSongs,
      playMusic,
      isMobile,
    }),
    // eslint-disable-next-line
    [isPlaying, playMusic, currSongIndex, songs, isMobile]
  );

  return <MusicContext.Provider value={values}>{childrenProps}</MusicContext.Provider>;
};

export const useITunes = () => useSafeContext(MusicContext);

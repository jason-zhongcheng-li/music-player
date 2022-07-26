import { useMemo, useState, useEffect, PropsWithChildren } from 'react';
import { createSafeContext, useSafeContext } from '../helper/context-helpers';
import { ApiService } from '../services/api';
import { ApiServiceImpl } from '../services/impl/api-service-impl';
import { Song, CurrentSong } from '../models/song';
import { Collection } from '../models/collection';

interface MusicProviderState {
  isPlaying: boolean;
  isLoading: boolean;
  currSong: CurrentSong;
  playedSongs: Array<CurrentSong>;
  playMusic: (play: boolean, song?: CurrentSong) => void;
  playOrPause: () => void;
  skipSong: (skipTo: 'rewind' | 'forward') => void;
  setPlayList: (songs: Array<Song>) => void;
  lookupSongsInAlbum: (collectionId: number) => Promise<Collection>;
  searchSongs: (searchValue: string) => Promise<Array<Song>>;
}

export const MusicContext = createSafeContext<MusicProviderState>();

export const MusicProvider = (props: PropsWithChildren) => {
  const { children: childrenProps } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songs, setSongs] = useState<Array<Song>>(null);
  const [currSong, setCurrSong] = useState<CurrentSong>(null);
  const [playedSongs, setPlayedSongs] = useState<Array<CurrentSong>>([]);
  const apiService: ApiService = new ApiServiceImpl();

  const audio = useMemo(
    () => (songs && currSong && songs[currSong?.index] ? new Audio(songs[currSong?.index]?.previewUrl) : null),
    [currSong]
  );

  // stop visual indicator once the song played
  audio?.addEventListener('ended', () => {
    setIsPlaying(false);
  });

  useEffect(() => {
    if (!audio) {
      return;
    } else if (isPlaying) {
      audio.play();
      // mark played song
      if (!playedSongs.find((song) => song?.index === currSong.index && song?.trackId === currSong?.trackId)) {
        setPlayedSongs([...playedSongs, currSong]);
      }
    }
    return () => {
      // prevent calling play() from another play()
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying, audio]);

  const searchSongs = async (searchValue: string): Promise<Array<Song>> => {
    setPlayedSongs([]);
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
    setCurrSong(null);
    setIsPlaying(false);
    setPlayedSongs([]);
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
    let newIndex = 0;
    if (currSong?.index >= 0) {
      newIndex =
        skipTo === 'forward'
          ? currSong.index < maxIndex
            ? currSong.index + 1
            : currSong.index
          : currSong.index > 0
          ? currSong.index - 1
          : currSong.index;
    }
    setCurrSong({ trackId: songs[newIndex].trackId, index: newIndex });
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const setPlayList = (songs: Array<Song>) => {
    setSongs(songs);
  };

  const playMusic = (play: boolean, song?: CurrentSong): void => {
    if (!currSong && !song) {
      setCurrSong({ trackId: songs[0].trackId, index: 0 });
    } else if (song) {
      setCurrSong(song);
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
      currSong,
      setPlayList,
      searchSongs,
      playMusic,
      playedSongs,
    }),
    // eslint-disable-next-line
    [isPlaying, playMusic, currSong, songs, playedSongs]
  );

  return <MusicContext.Provider value={values}>{childrenProps}</MusicContext.Provider>;
};

export const useITunes = () => useSafeContext(MusicContext);

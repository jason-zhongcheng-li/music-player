import { createSafeContext } from "../helper/context-helpers";


interface MusicProviderState {
  isPlaying: boolean;
  playOrPause: () => void;
  selectSong: (trackId: number) => void;
  lookupSongsInAlbum: (collectionId: number) => Promise<void>;
  searchSongs: (searchValue: string) => Promise<void>;
}

export const TrackContext = createSafeContext<MusicProviderState>();

export const MusicProvider = (props) => {
  const { children: childrenProps } = props;

};
export type WrapperType = 'collection' | 'track';

export type CollectionType = 'Album';

export type Kind = 'song';

export interface BaseITunesObj {
  wrapperType: WrapperType;
  artistId: number;
  collectionId: number;
  artistName: string;
  collectionCensoredName: string;
  artworkUrl60: string;
  artworkUrl100: string;
}






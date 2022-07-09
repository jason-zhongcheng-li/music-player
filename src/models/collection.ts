import { Song } from './song';
import { Album } from './album';

export interface Collection {
  album: Album;
  songs: Array<Song>;
}

export const mappResponseToCollectionObj = (response: Array<any>): Collection => {
  const albums: Array<Album> = response.filter(resp => resp["wrapperType"] === 'collection' && resp["collectionType"] === 'Album');
  const songs: Array<Song> = response.filter(resp => resp["wrapperType"] === 'track' && resp["kind"] === 'song');

  return {
    album: albums ? albums[0] : null,
    songs
  } as Collection;
};
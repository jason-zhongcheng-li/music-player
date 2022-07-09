import { Song } from "../models/song";
import { Collection } from "../models/collection";
import { SuccessOrError } from "../helper/request-helpers";

export interface ApiService {
  searchSongs(searchValue: string): Promise<SuccessOrError<Array<Song>, string>>;
  lookUpSongsInAlbum(collectionId: number): Promise<SuccessOrError<Collection, string>>;
}
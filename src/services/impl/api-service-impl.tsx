import fetcher, { FetcherService } from '../fetcher/fetcher';
import { ApiService } from '../api';
import { SuccessOrError, createSuccess, createError } from '../../helper/request-helpers';
import { Collection, mappResponseToCollectionObj } from '../../models/collection';
import { Song } from '../../models/song';

export class ApiServiceImpl implements ApiService {
  private iTunesSearchInstance: FetcherService;
  private iTunesLookupInstance: FetcherService;

  constructor() {
    this.iTunesSearchInstance = fetcher.create(`${process.env.REACT_APP_ITUNES_API_SEARCH_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'flavor=choco; SameSite=None; Secure',
        Accept: '*/*',
      },
    });

    this.iTunesLookupInstance = fetcher.create(`${process.env.REACT_APP_ITUNES_API_LOOKUP_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'flavor=choco; SameSite=None; Secure',
        Accept: '*/*',
      },
    });
  }

  async lookUpSongsInAlbum(collectionId: number): Promise<SuccessOrError<Collection, string>> {
    try {
      const response = await this.iTunesLookupInstance.get(`id=${collectionId}&entity=song`);
      if (response.status) {
        const resJson = await response.text();
        const respJson = JSON.parse(resJson).results;
        const collection = mappResponseToCollectionObj(respJson);
        return createSuccess(collection);
      } else {
        return createError('No Songs in the album found');
      }
    } catch (err) {
      return createError('Request error: ' + JSON.stringify(err, null, 2));
    }
  }

  async searchSongs(searchValue: string): Promise<SuccessOrError<Array<Song>, string>> {
    try {
      const response = await this.iTunesSearchInstance.get(
        `term=${searchValue}&media=music&entity=song&attribute=artistTerm`
      );
      if (response.status) {
        const resJson = await response.text();
        const songs = JSON.parse(resJson).results as Array<Song>;
        return createSuccess(songs);
      } else {
        return createError('No Albums found');
      }
    } catch (err) {
      return createError('Request error: ' + JSON.stringify(err, null, 2));
    }
  }
}

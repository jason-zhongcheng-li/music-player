import { BaseITunesObj, CollectionType } from './models';

export interface Album extends BaseITunesObj {
  collectionType: CollectionType;
  collectionPrice: number;
  trackCount: number;
}
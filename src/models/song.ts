import { BaseITunesObj, Kind } from "./models";

export interface Song extends BaseITunesObj {
  kind: Kind;
  trackId: number;
  trackCensoredName: string;
  previewUrl: string;
  artworkUrl30: string;
  trackTimeMillis: number;
}

export interface CurrentSong {
  trackId: number;
  index: number;
}


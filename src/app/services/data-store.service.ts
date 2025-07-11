import { Injectable } from '@angular/core';
import { SpotifyPlaylist } from '../models/spotify.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _genreSetList: BehaviorSubject<SpotifyPlaylist | null> =  new BehaviorSubject<SpotifyPlaylist | null>(null);

  public genreSetList$ = this._genreSetList.asObservable();

  public numRounds: number = 5;

  constructor() { }

  setGenreSetList(genreSetList: SpotifyPlaylist): void {
    this._genreSetList.next(genreSetList);
  }

}

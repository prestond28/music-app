import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpotifyPlaybackComponent } from '../spotify-playback/spotify-playback.component';
import { SpotifyTrack, SpotifyPlaylist } from '../models/spotify.models';
import { DataStoreService } from '../services/data-store.service';
import { Subject, takeUntil } from 'rxjs';

interface SortedTrack extends SpotifyTrack {
 displayOrder: number;
 isCorrect: boolean;
}


@Component({
  selector: 'app-game',
  imports: [MatSlideToggleModule, SpotifyPlaybackComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {
  public isStarted: boolean = false;
  public roundSetList: SpotifyTrack[] | null = null;
  private genreSetList: SpotifyPlaylist | null = null;
  private unsubscribeFromAll: Subject<void> = new Subject<void>();

  constructor(
    private dataStore: DataStoreService
  ) { }

  ngOnInit(): void {
    this.dataStore.genreSetList$
    .pipe(takeUntil(this.unsubscribeFromAll))
    .subscribe(genreSetList => {
      this.genreSetList = genreSetList;
    });
    
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAll.next();
    this.unsubscribeFromAll.complete();
  }

  getRandomSortedTracks(count: number): SortedTrack[] {
    if (!this.genreSetList || !this.genreSetList.tracks || this.genreSetList.tracks.length === 0) {
      return [];
    }

    const sortedTracks: SortedTrack[] = 
      [...this.genreSetList.tracks]
        .sort(() => 0.5 - Math.random())
        .slice(0, count - 1)
        .map((track, index) => ({
          ...track,
          displayOrder: index,
          isCorrect: false
        }));

    if (sortedTracks.length > 0) {
      const correctIndex = Math.floor(Math.random() * sortedTracks.length);
      sortedTracks[correctIndex].isCorrect = true;
    }
    return sortedTracks;
  }

  onGameStart(): void {
    this.roundSetList = this.getRandomSortedTracks(4);
    this.isStarted = true;
  }

}
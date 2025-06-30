import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpotifyPlaybackComponent } from '../spotify-playback/spotify-playback.component';
import { SpotifyTrack, SpotifyPlaylist } from '../models/spotify.models';
import { DataStoreService } from '../services/data-store.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

interface SortedTrack extends SpotifyTrack {
 displayOrder: number;
 isCorrect: boolean;
}


@Component({
  selector: 'app-game',
  imports: [
    MatSlideToggleModule,
    SpotifyPlaybackComponent, 
    NgClass, 
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {
  public isLoadingRound: boolean = true;
  public isRunning: boolean = false;
  public isGameOver: boolean = false;
  public roundSetList: SortedTrack[] | null = null;
  public correctTrack: SortedTrack | null = null;
  public maxTimeToGuess: number = 20000; // milliseconds
  public timeToGuess: number = this.maxTimeToGuess;
  public timerInterval: any = null;
  public roundTimeout: any = null;
  public rounds: number = 1;
  public roundNum: number = 1;
  public score: number = 0;
  public pointsForCorrectGuess: number = 100;
  public answerSelected: boolean = false;
  public selectedTrackId: string | null = null;
  private genreSetList: SpotifyPlaylist | null = null;
  private unsubscribeFromAll: Subject<void> = new Subject<void>();

  @ViewChild('playback')
  spotifyPlayback!: SpotifyPlaybackComponent;
  

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private spotifyService: SpotifyService,
  ) { }

  ngOnInit(): void {
    this.rounds = this.dataStore.numRounds

    this.dataStore.genreSetList$
    .pipe(takeUntil(this.unsubscribeFromAll))
    .subscribe(genreSetList => {
      this.genreSetList = genreSetList;
    });

    setTimeout(() => {
      this.onGameStart();

    }, 2500)
      
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
        .slice(0, count)
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
    console.log('Game started');
    this.isLoadingRound = true;
    this.isRunning = true;
    this.roundNum = 1;
    this.gameLoop();
  }

  onGameOver(): void {
    this.isRunning = false;
    this.isGameOver = true;
    this.router.navigate(['/game-over', this.score]);
  }

  onTrackSelected(selectedTrack: SortedTrack): void {
    if (this.answerSelected) return; // Prevent multiple answers per round
    this.answerSelected = true;
    this.selectedTrackId = selectedTrack.id;
    if (selectedTrack.isCorrect) {
      this.score = this.score + this.pointsForCorrectGuess + Math.round(this.timeToGuess / 200);
      console.log(this.score);
    }
  }
  startTimer(): void {
    this.timeToGuess = this.maxTimeToGuess; // Reset time to guess for each round
    this.timerInterval = setInterval(() => {
      if (this.answerSelected && this.timeToGuess > 0) {
        this.timeToGuess -= 2000; // Decrease faster by 2000 milliseconds   
      } else if (this.timeToGuess > 0) {
        this.timeToGuess -= 100; // Decrease by 100 milliseconds
      } else {
        this.stopTimer();
      }
    }, 100); // Update every 10 milliseconds
  }

  stopTimer(): void {
    clearInterval(this.timerInterval); // clear guessing timer
    console.log("time to guess ran out");
    // Wait n seconds before transition to next round
    setTimeout(() => {
      this.spotifyPlayback.stopTrack();
      this.roundNum++;
      this.playNextRound();
    }, 7000);
  }

  playNextRound = (): void => {
    if (this.roundNum > this.rounds) {
      this.onGameOver();
      return;
    }
    this.isLoadingRound = true;
    this.answerSelected = false;
    this.selectedTrackId = null;
    this.roundSetList = this.getRandomSortedTracks(4);
    this.isLoadingRound = false;
    this.correctTrack = this.roundSetList.find(track => track.isCorrect) ?? null;
    if (this.correctTrack && this.spotifyPlayback) {
      console.log('Correct track:', this.correctTrack);
      this.spotifyPlayback.playTrack(this.correctTrack.id);
      this.startTimer(); // setting time to guess
      // Timer automatically transitions next round when stopped
    } else {
      console.warn('SpotifyPlaybackComponent is not available yet or correct track is null');
      this.roundNum++; // Increment round number even if playback fails to ensure no infinite loop
    }

  };

  gameLoop(): void {
    this.playNextRound();
  }
}
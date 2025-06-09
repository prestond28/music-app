import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpotifyPlaybackComponent } from '../spotify-playback/spotify-playback.component';

@Component({
  selector: 'app-game',
  imports: [MatSlideToggleModule, SpotifyPlaybackComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {

  ngOnInit(): void {
      
  }
}
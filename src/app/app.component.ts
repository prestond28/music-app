import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [
    SpotifyService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Music App';
}

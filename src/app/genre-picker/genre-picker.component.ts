import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpotifyService } from '../services/spotify.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-genre-picker',
  imports: [CommonModule, MatCardModule],
  templateUrl: './genre-picker.component.html',
  styleUrl: './genre-picker.component.scss'
})
export class GenrePickerComponent implements OnInit {
  genres: string[] = ['pop'];
  public get userAuthenticated(): boolean {
    return this.authService.userAuthenticated;
  }

  constructor(private router: Router, private authService: AuthService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    if (this.userAuthenticated) {
      this.spotifyService.getSpotifyPlaylist('2Gm0cZxurJfsDFHSb76KRa').subscribe(result => {
        // handle the result here
        console.log(result);
        if (result && result.name) {
          this.genres = [...this.genres, result.name];
          console.log('Genre added:', result.name);
        }
      });

    } else {
      // If user is not authenticated, redirect to home
      this.router.navigate(['/home']);
    }
  }

  onGenreSelect(genre: string): void {
    // navigate to game with the selected genre
    
    this.router.navigate(['/game', genre]);
  }

}
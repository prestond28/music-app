import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpotifyService } from '../services/spotify.service';
import { MatCardModule } from '@angular/material/card';
import { SpotifyPlaylist, SpotifyTrack } from '../models/spotify.models';

interface PlaylistOptions {
    name: string;
    id: string;
  }

@Component({
  selector: 'app-genre-picker',
  imports: [CommonModule, MatCardModule],
  templateUrl: './genre-picker.component.html',
  styleUrl: './genre-picker.component.scss'
})
export class GenrePickerComponent implements OnInit {
  genreSetList: SpotifyPlaylist | null = null;

  genres: PlaylistOptions[] = [
    { name: "2000's", id:"0ElOVmIcPx1TUmpSLYta6E" },
    { name: "Rock Classics", id:"7epOGXs4fd2XxPMixXrYTw" }
  ];
  public get userAuthenticated(): boolean {
    return this.authService.userAuthenticated;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    if (!this.userAuthenticated) {
      // If user is not authenticated, redirect to home
      this.router.navigate(['/home']);
    }
  }

  onGenreSelect(genreName: string): void {

    // Find the selected genre object
    const selectedGenre = this.genres.find(g => g.name === genreName);
    if (selectedGenre) {
        console.log('Selected genre found:', selectedGenre.name);

      // Get playlist data from spotify
      this.spotifyService.getSpotifyPlaylist(selectedGenre.id).subscribe(result => {
          // handle the result here
          console.log(result);
          if (result) {
            this.genreSetList = {
              name: selectedGenre.name,
              tracks: result.items.map((item: any) => {
                const track: SpotifyTrack = {
                  name: item.track.name,
                  id: item.track.id
                };
                return track;
              })
            };

            console.log('Genre added to set list: ', selectedGenre.name);
            console.log(this.genreSetList);
          }

        });

      // navigate to game with the selected genre
      this.router.navigate(['/game', genreName]);
    return;
    }
  }
}
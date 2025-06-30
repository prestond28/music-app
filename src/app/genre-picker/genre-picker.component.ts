import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { MatCardModule } from '@angular/material/card';
import { SpotifyPlaylist, SpotifyTrack } from '../models/spotify.models';
import { DataStoreService } from '../services/data-store.service';

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
  public selectedGenreName: string | null = null;

  genres: PlaylistOptions[] = [
    { name: "2000's", id:"0ElOVmIcPx1TUmpSLYta6E" },
    { name: "Rock Classics", id:"7epOGXs4fd2XxPMixXrYTw" }
  ];

  constructor(
    private spotifyService: SpotifyService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    
  }

  onGenreSelect(genreName: string): void {

    // Find the selected genre object
    const selectedGenre = this.genres.find(g => g.name === genreName);
    if (selectedGenre) {
        console.log('Selected genre found:', selectedGenre.name);
        this.selectedGenreName = selectedGenre.name;

      // Get playlist data from spotify
      this.spotifyService.getSpotifyPlaylist(selectedGenre.id).subscribe(result => {
          // handle the result here
          console.log(result);
          if (result) {
            this.genreSetList = {
              name: selectedGenre.name,
              tracks: result.items.map((item: any) => {
                const track: SpotifyTrack = {
                  album: {
                    images: item.track.album.images
                  },
                  artists: item.track.artists,
                  name: item.track.name,
                  id: item.track.id
                };
                return track;
              })
            };

            this.dataStoreService.setGenreSetList(this.genreSetList);

            console.log('Genre added to set list: ', selectedGenre.name);
            console.log(this.genreSetList);
          }

        });
    return;
    }
  }
}
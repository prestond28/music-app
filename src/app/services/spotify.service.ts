import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  constructor(private http: HttpClient) { }

  authUser() {
    const client_id = '684e45693aeb488fa54c4580401e3d8a';
    const redirect_uri = 'http://127.0.0.1:4200/spotify';
    
  }

  getSpotifyPlaylist(playlistId: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    return this.http.get(url, {
      headers: {
        'Authorization': ''
        }
    });
  }
}

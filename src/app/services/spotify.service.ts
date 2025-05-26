import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getSpotifyPlaylist(playlistId: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    return this.http.get(url, {
      headers: {
        'Authorization': 'Bearer BQCy6vnLIDXKQPWlDQKHLRF7ZixCbgTvrZcy_c_DitV6oycetU1FnVq3CMtIX5HRozBUmv5NPm0hCoiIu_iA0UBIU9y67NCCN6P5CMf8NDvp9MYZz2yP6hPZgdXhSxeXB6fPB4hHfYxq7Lh83vk90PDMjA351gkcQFQ0jNUTih5tf5aOlf4lyNSVgGk-ZlyfqqxnFFFGsO-4E0tPZrTPZs1tOV8cIDOwd4S2ed4'
        }
    });
  }
}

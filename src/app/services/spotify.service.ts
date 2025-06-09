import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  client_id = '684e45693aeb488fa54c4580401e3d8a'
  url = 'https://accounts.spotify.com/api/token'
  redirect_uri = 'http://127.0.0.1:4200/spotify_callback'

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })

  constructor(private http: HttpClient, private authService: AuthService) { }

  getData (code: string, codeVerifier: string): Observable<any> {
    const body = new HttpParams()
    .set('code', code)
    .set('redirect_uri', this.redirect_uri)
    .set('grant_type', 'authorization_code')
    .set('client_id', this.client_id)
    .set('code_verifier', codeVerifier)

    return this.http.post(this.url, body, { headers: this.headers })
  }

  getSpotifyPlaylist (playlistId: string): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const authHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${this.authService.getSpotifyAccessToken()}`
    })

    return this.http.get(url, { headers: authHeaders });
  }
}

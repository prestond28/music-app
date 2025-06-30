import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotifyService } from '../services/spotify.service';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: any;
  }
}

@Component({
  selector: 'app-spotify-playback',
  imports: [],
  templateUrl: './spotify-playback.component.html',
  styleUrl: './spotify-playback.component.scss'
})
export class SpotifyPlaybackComponent implements OnInit {

  public device_id: string | null = null;

  constructor(private authService: AuthService, private spotifyService: SpotifyService) { }

  playTrack(trackId: string): void {
    if (!this.device_id) {
      console.warn('Device ID not ready yet!');
      return;
      } 
    const token = this.authService.getSpotifyAccessToken();
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`]
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      }).then(response => {
        if (response.ok) {
          console.log('Playback started!');
        } else {
          response.json().then(data => console.error('Playback error:', data));
        }
      }).catch(err => console.error('Fetch error:', err));
  };

  stopTrack(): void {
    const token = this.authService.getSpotifyAccessToken();
    if (!this.device_id) {
      console.warn('Device ID not ready to pause track!');
      return;
    }
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.device_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        console.log('Playback paused!');
      } else {
        response.json().then(data => console.error('Pause error:', data));
      }
    }).catch(err => console.error('Fetch error:', err));
  }
    

  ngOnInit(): void {
    // Dynamically load the Spotify Web Playback SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.authService.getSpotifyAccessToken();
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => { cb(token); }
      });
      
      // Ready
      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        this.device_id = device_id;
        this.spotifyService.setDeviceId(device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }: { message: string }) => {
        console.error(message);
      });

      player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
      });

      player.connect();
    };
  };
}


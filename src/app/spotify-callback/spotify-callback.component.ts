import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from '../services/spotify.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-spotify-callback',
  imports: [],
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.scss'
})
export class SpotifyCallbackComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private _router: Router, @Inject(PLATFORM_ID) private platformId: Object
, private authService: AuthService) { }

  ngOnInit () {
    if (isPlatformBrowser(this.platformId)) { //check to ensure this code runs only in the browser (else undefined error with localStorage)
      const previousState = localStorage.getItem('auth-state')
      const previousCodeVerifier = localStorage.getItem('code-verifier')

      const returnedData = new URLSearchParams(window.location.search)
      const returnedState = returnedData.get('state')
      const returnedCode = returnedData.get('code')

      if (
        returnedState &&
        returnedCode &&
        previousState &&
        previousCodeVerifier
      ) {
        if (returnedState != previousState) {
          //If state mismatch, stop the auth flow
          this._router.navigate(['/home']);
        } else {
          this.spotifyService
            .getData(returnedCode, previousCodeVerifier)
            .subscribe({
              next: result => {
                this.authService.authenticate(result);
              },
              complete: () => {
                console.log('done');
                this._router.navigate(['/home']);
              }
            })
        }
      }
      else{
        //If fail then this page was reached on accident so redirect to home
        this._router.navigate(['/home']);
      }
    }
  }
}

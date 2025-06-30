import { isPlatformBrowser } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import shajs from 'sha.js';
//Source for spotify auth setup: https://danielmccannsayles.medium.com/angular-tutorial-spotify-oauth2-authorization-code-flow-with-pkce-bbe9ecc3680a

function randomString (length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export interface SpotifyAuthObject {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string; // Optional, as it may not always be present
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuthenticated: BehaviorSubject<boolean | null> =  new BehaviorSubject<boolean | null>(null);
  authObject: string | null = null

  public userAuthenticated$ = this._userAuthenticated.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setUserAuthenticated(userAuthenticated: boolean): void {
      this._userAuthenticated.next(userAuthenticated);
    }

  public checkAuth(): void {
    if (isPlatformBrowser(this.platformId)) { //check to ensure this code runs only in the browser (else undefined error with localStorage)
      const authObjectJson = localStorage.getItem('auth_object');
      if (authObjectJson){
        this.authObject = JSON.parse(authObjectJson)
        this.setUserAuthenticated(true);
      } else {
        this.setUserAuthenticated(false);
      }
    }
  }
  
  onAuthClick () {
    const generated_state: string = randomString(16)
    //Code Verifier: create random string. Hash it w/ SHA256 and convert to base 64. Make it URL safe; now it's base-64-url-encoded :)
    const codeVerifier: string = randomString(128)
    let codeVerifierHash = shajs('sha256')
      .update(codeVerifier)
      .digest()
      .toString('base64')
    const codeChallenge = codeVerifierHash
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    localStorage.setItem('auth-state', generated_state)
    localStorage.setItem('code-verifier', codeVerifier)

    //Authorization Link
    const baseURL: string = 'https://accounts.spotify.com/en/authorize?'
    const paramObject = {
      response_type: 'code',  
      client_id: '684e45693aeb488fa54c4580401e3d8a',
      scope: 'user-read-private user-read-email streaming user-modify-playback-state',
      redirect_uri: 'http://127.0.0.1:4200/spotify_callback',
      state: generated_state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    }

    const paramString = new HttpParams({ fromObject: paramObject }).toString()
    const authLink = baseURL + paramString
    window.location.href = authLink
  }

  authenticate(result: any) {
    console.log(result)
    localStorage.setItem('auth_object', JSON.stringify(result));
    this.setUserAuthenticated(true);
  }

  onLogOut() {
    localStorage.clear();
    this.setUserAuthenticated(false);
  }

  public getSpotifyAccessToken(): string {
    return (JSON.parse(localStorage.getItem('auth_object') ?? '') as SpotifyAuthObject)?.access_token ?? '';
  }
}

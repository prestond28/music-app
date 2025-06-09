import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'game/:genre',
        component: GameComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'spotify_callback',
        component: SpotifyCallbackComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';
import { GameOverComponent } from './game-over/game-over.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'game',
        component: GameComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'spotify_callback',
        component: SpotifyCallbackComponent,
    },
    {
        path: 'game-over/:score',
        component: GameOverComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { GenrePickerComponent } from '../genre-picker/genre-picker.component';
import { SettingAdjusterComponent } from '../setting-adjuster/setting-adjuster.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { DataStoreService } from '../services/data-store.service';
import { Subject, takeUntil } from 'rxjs';
import { SpotifyPlaylist } from '../models/spotify.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    GenrePickerComponent,
    CommonModule, 
    MatButtonModule,
    SettingAdjusterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public userAuthenticated: boolean | null = null;
  public genreSetList: SpotifyPlaylist | null = null;
  private unsubscribeFromAll: Subject<void> = new Subject<void>();


  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataStore: DataStoreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkAuth();
    }

    this.dataStore.genreSetList$
      .pipe(takeUntil(this.unsubscribeFromAll))
      .subscribe(genreSetList => {
        this.genreSetList = genreSetList;
      }
    );

    this.authService.userAuthenticated$
      .pipe(takeUntil(this.unsubscribeFromAll))
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      }
    );

    
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAll.next();
    this.unsubscribeFromAll.complete();
  }

  onAuthClick() {
    this.authService.onAuthClick();
  }

  onLogOut() {
    this.authService.onLogOut();
  }

  startGame() {
    // navigate to game with the selected genre
    if (this.genreSetList && this.genreSetList.name) {
      this.router.navigate(['/game']);
    }
  }
}

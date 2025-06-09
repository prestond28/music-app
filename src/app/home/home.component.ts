import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { GenrePickerComponent } from '../genre-picker/genre-picker.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [GenrePickerComponent, CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public get userAuthenticated(): boolean {
    return this.authService.userAuthenticated;
  }

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkAuth();
    }
  }

 public onAuthClick() {
  this.authService.onAuthClick();
 }
}

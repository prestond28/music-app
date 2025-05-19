import { Component } from '@angular/core';
import { GenrePickerComponent } from '../genre-picker/genre-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [GenrePickerComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

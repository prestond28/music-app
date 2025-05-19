import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-picker',
  imports: [CommonModule],
  templateUrl: './genre-picker.component.html',
  styleUrl: './genre-picker.component.scss'
})
export class GenrePickerComponent {
  genres: any[] = [ 'Pop' , 'Rock', 'Classical', 'Hip-Hop', 'Country', '1980s' ];
}
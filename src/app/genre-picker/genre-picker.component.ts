import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-picker',
  imports: [CommonModule],
  templateUrl: './genre-picker.component.html',
  styleUrl: './genre-picker.component.scss'
})
export class GenrePickerComponent implements OnInit {
  genres: string[] = [ 'Pop' , 'Rock', 'Classical', 'Hip-Hop', 'Country', '1980s' ];


  constructor(private router: Router) { }

  ngOnInit(): void {
    // To do later: Fetch genres from api
  }

  onGenreSelect(genre: string): void {
    // navigate to game with the selected genre
    
    this.router.navigate(['/game', genre]);
  }

}
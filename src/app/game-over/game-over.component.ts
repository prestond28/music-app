import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-over',
  imports: [MatButtonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
public score: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.score = Number(this.route.snapshot.paramMap.get('score'));

  }

  restartGame(): void {
    this.router.navigate(['/game']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }



}

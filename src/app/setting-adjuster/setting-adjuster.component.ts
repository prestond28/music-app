import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-setting-adjuster',
  imports: [MatButtonToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './setting-adjuster.component.html',
  styleUrl: './setting-adjuster.component.scss'
})
export class SettingAdjusterComponent {
  public numRounds: number = 5;

  constructor (private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this.dataStoreService.numRounds = this.numRounds

  }

  public onValChange(value: number): void {
    this.numRounds = value;
    this.dataStoreService.numRounds = value

  }

}

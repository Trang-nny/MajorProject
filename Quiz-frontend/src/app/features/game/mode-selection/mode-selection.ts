import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mode-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mode-selection.html',
  styleUrls: ['./mode-selection.css']
})
export class ModeSelection {
  constructor() {}
}
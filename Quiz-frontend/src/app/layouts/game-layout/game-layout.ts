import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-game-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './game-layout.html',
  styleUrls: ['./game-layout.css'],
})
export class GameLayout {}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() type: 'auth' | 'home' | 'profile' | 'game' | 'auth-signin' | 'auth-signup' = 'home';
  
  username: string = 'Alex Rivera';
}
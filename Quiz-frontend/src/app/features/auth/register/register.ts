import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  passwordVisible: boolean = false;
  togglePassword() { this.passwordVisible = !this.passwordVisible; }
}
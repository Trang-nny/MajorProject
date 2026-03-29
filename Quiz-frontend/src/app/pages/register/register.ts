import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class RegisterComponent {
  showPassword = false;
  showConfirm = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  loginWithGoogle() {
    alert("Google login coming soon 😄");
  }
}

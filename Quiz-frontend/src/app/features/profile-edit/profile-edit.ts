import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css',
})
export class ProfileEdit {
  user = {
    username: 'Alex Rivera',
    accountId: 'ID_882941',
    email: 'alex.rivera@example.com',
    bio: 'Passionate quizzer and knowledge seeker. Exploring the Neon Atoll one trivia at a time! \uD83D\uDE80',
    avatar: 'User.png'
  };

  saveChanges() {
    console.log('Saving changes:', this.user);
  }

  cancel() {
    console.log('Cancel editing');
  }
}
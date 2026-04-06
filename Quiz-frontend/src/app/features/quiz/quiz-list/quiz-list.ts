import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizList {
  // Logic xử lý nếu cần
}
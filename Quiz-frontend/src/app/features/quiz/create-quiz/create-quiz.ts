import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-quiz.html',
  styleUrls: ['./create-quiz.css']
})
export class CreateQuiz {
  // Logic xử lý thêm câu hỏi, lưu quiz sẽ được Backend xử lý sau
}
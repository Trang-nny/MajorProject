import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-room.html',
  styleUrls: ['./game-room.css']
})
export class GameRoom {
  // Biến tạm để giả lập trạng thái câu hỏi
  questionNumber: number = 12;
  totalQuestions: number = 25;
  timeLeft: number = 20;

  // Xử lý khi chọn câu trả lời (sau này sẽ cắm logic vào đây)
  selectAnswer(option: string) {
    console.log('Selected option: ', option);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-edit.html',
  styleUrls: ['./quiz-edit.css'],
})
export class QuizEdit implements OnInit {
  // Thông tin Quiz đồng bộ với quizData trong template
  quizData = {
    title: 'Deep Space Astronomy: Nebula Wonders',
    level: 'Mid',
    description: 'Test your knowledge on the most beautiful celestial formations in our galaxy.',
    image: 'Space.png',
    coverFileName: 'Space.png'
  };

  // Danh sách câu hỏi đồng bộ với create-quiz
  questions: any[] = [
    {
      questionText: "Which nebula is famously known as the 'Pillars of Creation'?",
      options: [
        { text: 'Eagle Nebula', isCorrect: true },
        { text: 'Orion Nebula', isCorrect: false },
        { text: 'Crab Nebula', isCorrect: false },
        { text: 'Helix Nebula', isCorrect: false }
      ],
      timeLimit: 20,
      points: 100,
      allowMultiple: false
    }
  ];

  currentQuestionIndex = 0;

  constructor() {}
  ngOnInit(): void {}

  // Chọn Level
  selectLevel(l: string) {
    this.quizData.level = l;
  }

  // Xử lý chọn ảnh Cover
  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.quizData.coverFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.quizData.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Thêm câu hỏi mới (Mặc định 4 đáp án)
  addQuestion() {
    this.questions.push({
      questionText: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      timeLimit: 30,
      points: 100,
      allowMultiple: false
    });
    this.currentQuestionIndex = this.questions.length - 1;
  }

  // Xóa câu hỏi
  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
      if (this.currentQuestionIndex >= this.questions.length) {
        this.currentQuestionIndex = this.questions.length - 1;
      }
    }
  }

  // Điều hướng
  prevQuestion() {
    if (this.currentQuestionIndex > 0) this.currentQuestionIndex--;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) this.currentQuestionIndex++;
  }
}